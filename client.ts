import VideoWrapper from './VideoWrapper';
import {Message, MessageType, MessageDirection} from './entities/Message';

class ClientEvents {
    public eventMap: any; 
    constructor(){
        this.eventMap = {};
    }
    callEvent(event){
        if(this.eventMap[event]){
            return this.eventMap[event];
        } else {
            return function(){}
        }
    }
    
}

class Client {

    private _localVideo: VideoWrapper;
    private _remoteVideo: VideoWrapper;
    private _retryCount: number;
    private _retryLimit: number;
    private events: ClientEvents;
    private _mediaConstraints: any = {}; 
    private _iceServers:Array<any> = []; 
    
    public peerConnection: IPeerConnection;

    private _rtc: IRTC;

    constructor(settings: any, rtc: IRTC) {
        this._rtc = rtc; 
        this.events = new ClientEvents(); 
    }
    
    public init(data:any){
        if(data.iceServers){
            this._iceServers = data.iceServers;
        }
    }
    /**
     * Call allows you to call a remote user using their userId
     * @param _id {string}
     * @param local {IHTMLMediaElement}
     * @param remote {IHTMLMediaElement}
     */
    public call(params:ICallParams): void {
        this._retryCount = 0;
        const {video,audio,localElement,remoteElement,id} = params; 
        this._localVideo = null;
        this._remoteVideo = null;
        this._mediaConstraints = {
            audio, 
            video
        };
        if (localElement !== undefined){
            this._localVideo = new VideoWrapper(localElement);
        }
        if (remoteElement !== undefined){
            this._remoteVideo = new VideoWrapper(remoteElement);
        }
        this.events.callEvent("callInitialized")(params);
    }
    /**
     * Reject a new phone call that the user is recieving
     * 
     * */
    public rejectCall(){
        this._localVideo = null; 
        this._remoteVideo = null; 
        this.events.callEvent("rejectCall")(); 
    }
    /**
     * handle the stream on the caller side
     * @param message {Message}
     * 
     */
    public handleSenderStream(message: Message): void {
        this.addIceCandidate(message);
        if (message.Type === MessageType.SessionDescription) {
            this.peerConnection.setRemoteDescription(message.data).catch(this.events.callEvent("error"));
        }
    }
    
    /**
     * Event handler for when the target accepts the call
     * 
     */
    public  handleTargetAccept() {
        this._rtc.getUserMedia(this._mediaConstraints).then((stream: any) => {
            if (this._localVideo) {
                this._localVideo.setStream(stream, true);
                this._localVideo.play();
            }
            this.setupPeerConnection(stream);
        }).catch((err: Error) => {
            this.events.callEvent("error")(err);
        });

    }
    /**
     * handle the stream on the target
     * @param message {Message}
     * 
     */
    public handleTargetStream(message: Message) {
        this.addIceCandidate(message);
        if (message.Type === MessageType.SessionDescription) {

            this._rtc.getUserMedia(this._mediaConstraints).then((stream:any)=>{
            if (this._localVideo) {
                this._localVideo.setStream(stream, true);
                this._localVideo.play();
            }
            this.setupPeerConnection(stream, message.data);
            }).catch(this.events.callEvent("error"));
        }
    }
    private addIceCandidate(message:Message){
         if (message.Type === MessageType.Candidate) {
            if (this.peerConnection) {
                this.peerConnection.addIceCandidate(message.data).catch(this.events.callEvent("error"));
            }
        }
    }
    private setupPeerConnection(stream: IMediaStream, remoteDescription?: Object): void {
        console.log(this._rtc);
        this.peerConnection = this._rtc.createPeerConnection({
            iceServers:this._iceServers
        });
        this.events.callEvent("peerConnectionCreated")();
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
                    this._rtc.getUserMedia(this._mediaConstraints).then((stream: any) => {
                        this._retryCount++;
                        if (this._localVideo) {
                            this._localVideo.pause();
                            this._localVideo.setStream(stream, true);
                            this._localVideo.play();
                        }
                        this.setupPeerConnection(stream);

                    }).catch(this.events.callEvent("error"));

                } else {
                    const error = new Error("Could not establish connection");
                    this.events.callEvent("error")(error);
                }

    }
    private setPeerConnectionCallbacks(): void {
        this.peerConnection.onicecandidate = function (event: any)  {
            this.events.callEvent("emitIceCandidate")(event.candidate);
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
    public answerPhoneCall(params: ICallParams): void {
        this._localVideo = null;
        this._remoteVideo = null;
        const {video,audio,localElement,remoteElement,id} = params; 
        this._mediaConstraints = {
            video, 
            audio
        };
        if (localElement !== undefined){
            this._localVideo = new VideoWrapper(localElement);
        }
        if (remoteElement !== undefined){
            this._remoteVideo = new VideoWrapper(remoteElement);
        }
        this.events.callEvent("answerPhoneCall")(this.events.callEvent("error"));
    }


    /**
     * End the current phone call
     */
    public endPhoneCall(): void {
        console.log("ending phone call");
        this.events.callEvent("endPhoneCall")();
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
                    this.events.callEvent("error")(setLocalDescriptionError);
                });
                this.events.callEvent("emitTargetAnswer")(answer);
            }).catch((createAnswerError: Error) => {
                this.events.callEvent("error")(createAnswerError);
            });
        }).catch((setRemoteDescriptionError: Error) => {
            this.events.callEvent("error")(setRemoteDescriptionError);
        });


    }

    private createCallSession() {
        var offer = this.peerConnection.createOffer().then((offer:any)=>{
            this.peerConnection.setLocalDescription(offer);
            this.events.callEvent("emitSenderDescription")(offer);
            this.peerConnection.setLocalDescription(offer);
        }).catch((err:Error)=>{
            this.events.callEvent("error")(err);
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
    
    public on(eventName:string, action:Function) {
        this.events.eventMap[eventName] = action; 
    }


}
export default Client;