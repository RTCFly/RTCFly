import VideoWrapper from './VideoWrapper';
import {Message, MessageType, MessageDirection} from './entities/Message';


class Client {

    public _handler: IHandler;
    private _rtc: IRTC;
    private _rtcFactory: IRTCFactory;
    private _localVideo: VideoWrapper;
    private _remoteVideo: VideoWrapper;
    private _retryCount: Number;
    private _retryLimit: Number;

    public peerConnection: IPeerConnection;
    private _RTCConfiguration: Object;


    constructor(handler: IHandler, rtc: IRTC, rtcFactory: IRTCFactory) {
        this._handler = handler;
        this._rtc = rtc;
        this._rtcFactory = rtcFactory;
    }


    /**
     * Call allows you to call a remote user using their userId
     * @param _id {string}
     * @param local {IHTMLMediaElement}
     * @remote remote {IHTMLMediaElement}
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
        this.peerConnection = this._rtcFactory.createPeerConnection(this._RTCConfiguration);
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

    private setPeerConnectionCallbacks(): void {
        this.peerConnection.onicecandidate = function (event: any) {
            this._handler.emitIceCandidate(event.candidate);
        }.bind(this);
        this.peerConnection.oniceconnectionstatechange = function (event: any) {
            if (event.target.iceConnectionState === "failed") {
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

    public getLocalVideo(): VideoWrapper {
        if (this._localVideo) {
            return this._localVideo;
        } else {

            return undefined;
        }
    }

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


}
export default Client;