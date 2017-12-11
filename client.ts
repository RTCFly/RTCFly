import VideoWrapper from './VideoWrapper';
import {Message, MessageType, MessageDirection} from './entities/Message';


class Client {

    public _handler: IHandler;
    private _localVideo: VideoWrapper;
    private _remoteVideo: VideoWrapper;
    private _retryCount: number;
    private _retryLimit: number;

    public peerConnection: IPeerConnection;
    private _RTCConfiguration: Object;
    private _rtc: IRTC;

    constructor(handler: IHandler, rtc: IRTC) {
        this._handler = handler;
        this._rtc = rtc; 
    }


    /**
     * Call allows you to call a remote user using their userId
     * @param _id {string}
     * @param local {IHTMLMediaElement}
     * @param remote {IHTMLMediaElement}
     */
    public call(_id: string, local: IHTMLMediaElement, remote: IHTMLMediaElement): void {
        this._retryCount = 0;

        this._localVideo = null;
        this._remoteVideo = null;
        if (local !== undefined)
            this._localVideo = new VideoWrapper(local);
        if (remote)
            this._remoteVideo = new VideoWrapper(remote);
        this._handler.call(_id, this._handler.onCallInitialised);
    }
    /**
     * Reject a new phone call that the user is recieving
     * 
     * */
    public rejectCall(){
        this._localVideo = null; 
        this._remoteVideo = null; 
        this._handler.rejectCall(); 
    }
    /**
     * handle the stream on the caller side
     * @param message {Message}
     * 
     */
    public handleSenderStream(message: Message): void {
        if (message.Type === MessageType.Candidate) {
            if (this.peerConnection) {
                this.peerConnection.addIceCandidate(message.data).catch(this.onError);
            }
        }
        if (message.Type === MessageType.SessionDescription) {
            this.peerConnection.setRemoteDescription(message.data).catch(this.onError);
        }
    }
    /**
     * Event handler for when the target accepts the call
     * 
     */
    public  handleTargetAccept() {
        this._rtc.getUserMedia().then((stream: any) => {
            if (this._localVideo) {
                this._localVideo.setStream(stream, true);
                this._localVideo.play();
            }
            this.setupPeerConnection(stream);
        }).catch((err: Error) => {
            this.onError(err);
        });

    }
    /**
     * handle the stream on the target
     * @param message {Message}
     * 
     */
    public handleTargetStream(message: Message) {
        if (message.Type === MessageType.Candidate) {
            if (this.peerConnection) {
                this.peerConnection.addIceCandidate(message.data).catch(this.onError);
            }
        }
        if (message.Type === MessageType.SessionDescription) {

            this._rtc.getUserMedia().then((stream:any)=>{
            if (this._localVideo) {
                this._localVideo.setStream(stream, true);
                this._localVideo.play();
            }
            this.setupPeerConnection(stream, message.data);
            }).catch(this.onError);
        }
    }

    private setupPeerConnection(stream: IMediaStream, remoteDescription?: Object): void {
        console.log(this._rtc);
        this.peerConnection = this._rtc.createPeerConnection(this._RTCConfiguration);
        this._handler.onPeerConnectionCreated();
        this.setPeerConnectionCallbacks();
        this.peerConnection.addStream(stream);
        if (remoteDescription) {
            this.createTargetSession(remoteDescription);
        }
        else {
            this.createCallSession();
        }
    }
    private iceConnectionStateFailed(): void {
           this.peerConnection = undefined;
                if (this._retryCount < this._retryLimit) {
                    this._rtc.getUserMedia().then((stream: any) => {
                        this._retryCount++;
                        if (this._localVideo) {
                            this._localVideo.pause();
                            this._localVideo.setStream(stream, true);
                            this._localVideo.play();
                        }
                        this.setupPeerConnection(stream);

                    }).catch((err: Error) => {
                        this.onError(err);
                    });

                } else {
                    const error = new Error("Could not establish connection");
                    this.onError(error);
                }

    }
    private setPeerConnectionCallbacks(): void {
        this.peerConnection.onicecandidate = function (event: any)  {
            this._handler.emitIceCandidate(event.candidate);
        }.bind(this);
        this.peerConnection.oniceconnectionstatechange = function (event: any) {
            if (event.target.iceConnectionState === "failed") {
             this.iceConnectionStateFailed(); 
            }
        }.bind(this);
        this.peerConnection.onaddstream = function (stream: any) {
            if (this._remoteVideo) {
                this._remoteVideo.pause();
                this._remoteVideo.setStream(stream.stream);
                this._remoteVideo.play();
            }
        }.bind(this);
    }

    /**
     * Answer the phone call
     * @param local {IHTMLMediaElement}
     * @param remote {IHTMLMediaElement}
     */
    public answerPhoneCall(local: IHTMLMediaElement, remote: IHTMLMediaElement): void {
        this._localVideo = undefined;
        this._remoteVideo = undefined;
        if (local)
            this._localVideo = new VideoWrapper(local);
        if (remote)
            this._remoteVideo = new VideoWrapper(remote);
        this._handler.answerPhoneCall(this.onError);
    }


    /**
     * End the current phone call
     */
    public endPhoneCall(): void {
        this._handler.endPhoneCall(this.onError);
    }

    /**
     * Can be overridden
     * @param err {Error}
     */
    public onError(err: Error): void {

    }

    /**
     * Set up the target WebRTC session
     * Needs to be reimplemented with await
     * @param remoteDescription {RTCSessionDescription}
     */
    private createTargetSession(remoteDescription: Object) {

        this.peerConnection.setRemoteDescription(remoteDescription).then(() => {

            this.peerConnection.createAnswer().then((answer: Object) => {

                this.peerConnection.setLocalDescription(answer).catch((setLocalDescriptionError: Error) => {
                    this.onError(setLocalDescriptionError);
                });
                this._handler.emitTargetAnswer(answer);
            }).catch((createAnswerError: Error) => {
                this.onError(createAnswerError);
            });
        }).catch((setRemoteDescriptionError: Error) => {
            this.onError(setRemoteDescriptionError);
        });


    }

    private createCallSession() {
        var offer = this.peerConnection.createOffer().then((offer:any)=>{
            this.peerConnection.setLocalDescription(offer);
            this._handler.emitSenderDescription(offer);
            this.peerConnection.setLocalDescription(offer);
        }).catch((err:Error)=>{
            this.onError(err);
        });
    }
    /**
     * Get the VideoWrapper for the local video
     * @returns {VideoWrapper}
     */
    public getLocalVideo(): VideoWrapper {
        if (this._localVideo) {
            return this._localVideo;
        } else {

            return undefined;
        }
    }
    /**
     * Get the VideoWrapper for the remote video
     * @returns {VideoWrapper}
     */
    public getRemoteVideo(): VideoWrapper {
        if (this._remoteVideo) {
            return this._remoteVideo;
        } else {
            return undefined;
        }
    }


    onTargetAccept() {

    }

    onReceivePhoneCall(fields: any) {

    }

    onTerminateCall() {

    }

    onPeerConnectionCreated() {

    }
    onTargetReject(){
        
    }


}
export default Client;