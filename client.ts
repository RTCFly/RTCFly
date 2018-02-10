
import VideoWrapper from './VideoWrapper';
import DataChannel from './DataChannel';
import { Message, MessageType, MessageDirection } from './entities/Message';


class ClientEvents {
    public eventMap: any; 
    
    private _logger:any;
    constructor({
        logger
    }){
        this.eventMap = {};
        this._logger = logger;
    }
    callEvent(event){
        this._logger.log("calling event", event);
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
    private events: ClientEvents;
    private _mediaConstraints: any = {}; 
    private _iceServers:Array<any> = []; 
    private _devices:Array<IMediaDeviceInfo>;
    private _messagingClient:any;
    private _userIP:string; 
    

    private _rtc: IRTC;
    private _ip: any; 
    private _logger: any; 

    constructor(settings: any, {
        rtc,
        ip,
        logger
    }, messagingClient:MessagingClient) {
        
        this._rtc = rtc; 
        this._ip = ip; 
        this._logger = logger; 
        this.events = new ClientEvents({
            logger
        }); 
        this._messagingClient = new MessagingClient(); 
    }
    private enumerateDevices() : void {
        this._rtc.enumerateDevices().then(devices => {
           this._devices = devices;  
        }).then(() => {
            this._rtc.onDeviceChange(event => {
                console.log("onDeviceChange", event);
                event.target.enumerateDevices(devices =>{
                     this._devices = devices;  
                })
            });
        });
    }
    public init(data:any){
        this.enumerateDevices();
        this._ip.obtainIP(IP => {
            this._logger.log("initalizing", data);
            if(data !== undefined){
                if(data.uri !== undefined){
                    this._messagingClient.init({uri:data.uri, mode:data.mode, user:data.user, IP});
                }
                if(data.iceServers){
                    this._iceServers = data.iceServers;
                }
                if(data.debug === true){
                    this._logger.enable();
                } else if(data.debug === false){
                    this._logger.disable();
                }
            }
            this._userIP = IP; 
            this.events.callEvent("coreInitialized")();
        });
    }
    /**
     * Call allows you to call a remote user using their userId
     * @param _id {string}
     * @param local {IHTMLMediaElement}
     * @param remote {IHTMLMediaElement}
     */
    public call(params:ICallParams): void {
        this._logger.log("starting call", params);
        const {video,audio,localElement,remoteElement,id} = params; 
        this._localVideo = null;
        this._remoteVideo = null;
        this._mediaConstraints = {
            audio, 
            video
        };
        if (localElement !== undefined){
            this._logger.log("setting local element", localElement);
            this._localVideo = new VideoWrapper(localElement);
        }
        if (remoteElement !== undefined){
            this._logger.log("setting remote element", remoteElement);
            this._remoteVideo = new VideoWrapper(remoteElement);
        }
        this.events.callEvent("callInitialized")(params);
    }
 
    /**
     * 
     * Create a datachannel 
     * 
     */
    public createDataChannel(options:any) : DataChannel{
        this._logger.log("creating data channel", options);
        if(!this._rtc.peerConnection){
            throw new Error("PeerConnection is not initialized");
        }
        return new DataChannel(options, this._rtc.peerConnection);
    }
    /**
     * Reject a new call that the user is recieving
     * 
     * */
    public rejectCall(){
        this._logger.log("rejecting call");
        this._localVideo = null; 
        this._remoteVideo = null; 
        this._rtc.rejectCall();
        this.events.callEvent("rejectCall")(); 
    }
    /**
     * handle the stream on the caller side
     * @param message {Message}
     * 
     */
    public handleSenderStream(message: Message): void {
        this._logger.log("handle sender stream", message);
        this._rtc.processIceCandidate(message);
        if (message.Type === MessageType.SessionDescription) {
            this._logger.log("handle session description", message);
            this._rtc.setRemoteDescription(message.data);
        }
    }
    
    /**
     * Event handler for when the target accepts the call
     * 
     */
    public  handleTargetAccept() {
        this._logger.log("handle target accept");
        if(this._mediaConstraints.video || this._mediaConstraints.audio){
            this._rtc.getUserMedia(this._mediaConstraints).then((stream: any) => {
                this._logger.log("got local media", stream);
                if (this._localVideo) {
                    this._localVideo.setStream(stream, true);
                    this._localVideo.play();
                }
                this._rtc.setupPeerConnection(stream);
            }).catch((err: Error) => {
                log.error("could not get user media", err);
                this.events.callEvent("userMediaError")(err);
            });
        } else {
            this._rtc.setupPeerConnection();
        }

    }
    /**
     * handle the stream on the target
     * @param message {Message}
     * 
     */
    public handleTargetStream(message: Message) {
        this._logger.log("handle target stream", message);
        this._rtc.processIceCandidate(message);
        if (message.Type === MessageType.SessionDescription) {
            this._logger.log("handle session description");
            if(this._mediaConstraints.video !== undefined 
            || this._mediaConstraints.audio !== undefined){
                this._rtc.getUserMedia(this._mediaConstraints).then((stream:any)=>{
                    this._logger.log("getUserMedia", stream);
                if (this._localVideo) {
                    this._localVideo.setStream(stream, true);
                    this._localVideo.play();
                }
                this._rtc.setupPeerConnection(stream, message.data);
                }).catch(err =>{
                    log.error("getUserMedia failed", err);
                    this.events.callEvent("userMediaError")(err);
                });
            } else {
                this._rtc.setupPeerConnection();
            }
        }
    }
    
    /**
     * Answer the call
     * @param local {IHTMLMediaElement}
     * @param remote {IHTMLMediaElement}
     */
    public answerCall(params: ICallParams): void {
        log.info("answer call", params);
        this._localVideo = null;
        this._remoteVideo = null;
        const {video,audio,localElement,remoteElement} = params; 
        this._mediaConstraints = {
            video, 
            audio
        };
        if (localElement !== undefined){
            log.info("setting local video", localElement);
            this._localVideo = new VideoWrapper(localElement);
        }
        if (remoteElement !== undefined){
            log.info("setting remote video", remoteElement);
            this._remoteVideo = new VideoWrapper(remoteElement);
        }
        this.events.callEvent("answerCall")(this.events.callEvent("error"));
    }
    
    public async getDevices(){
        try{
        const devices  = await this._rtc.enumerateDevices();
        console.log("donkey");
        return  devices; 
        }catch(err){
            return [];
        }
    }
    
    /**
     * End the current call
     */
    public endCall(): void {
        log.info("ending call");
        if(this._localVideo){
            log.info("stopping local video");
            this._localVideo.stop(); 
            this._localVideo = null;
        }
        if(this._remoteVideo){
            log.info("stopping remote video");
            this._remoteVideo.stop(); 
            this._remoteVideo = null;
        }
        this._rtc.reset();
         
        this.events.callEvent("endCall")();
    }

    

    private createCallSession() {
        log.info("creating call session");
        this._rtc.createSession();
    }
    /**
     * Get the VideoWrapper for the local video
     * @returns {VideoWrapper}
     */
    public getLocalVideo(): VideoWrapper {
        log.info("getting local video", this._localVideo);
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
        log.info("getting remote video", this._remoteVideo);
        if (this._remoteVideo) {
            return this._remoteVideo;
        } else {
            return undefined;
        }
    }
    
    public on(eventName:string, action:Function) {
        log.info("adding event", eventName);
        this.events.eventMap[eventName] = action; 
    }


}
export default Client;