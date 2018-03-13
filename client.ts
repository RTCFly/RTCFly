

class Client {
    
    public events :IEvents;
    
    private _devices:Array<IMediaDeviceInfo>;
    private _messagingService:any;
    private _userIP:string; 
    private _entities:any; 
    

    private _rtc: IRTC;
    private _ip: any; 
    private _logger: any; 

    constructor(settings: any, {
        rtc,
        ip,
        logger,
        events,
        messagingService
    }, entities:any) {
        
        this._rtc = rtc; 
        this._ip = ip; 
        this._logger = logger; 
        this._messagingService = messagingService; 
        this.events = events;
        this._entities = entities; 
    }

    public init(data:any){
        this._ip.obtainIP(IP => {
            this._logger.log("initalizing", data);
            if(data !== undefined){
                if(data.uri !== undefined){
                    this._messagingService.init({uri:data.uri, mode:data.mode, user:data.user, IP});
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
        this._rtc.startCall(params);
        this.events.callEvent("callInitialized")(params);
    }
 
    /**
     * 
     * Create a datachannel 
     * 
     */
    public createDataChannel(options:any) : IDataChannel{
        this._logger.log("creating data channel", options);
        if(!this._rtc.peerConnection){
            throw new Error("PeerConnection is not initialized");
        }
        return new this._entities.DataChannel(options, this._rtc.peerConnection);
    }
    /**
     * Reject a new call that the user is recieving
     * 
     * */
    public rejectCall(){
        this._logger.log("rejecting call");
        this._rtc.reset();
        this.events.callEvent("rejectCall")(); 
    }
    /**
     * handle the stream on the caller side
     * @param message {Message}
     * 
     */
    public handleSenderStream(message: IMessage): void {
        this._logger.log("handle sender stream", message);
        this._rtc.handleSenderStream(message);
    }
    
    /**
     * Event handler for when the target accepts the call
     * 
     */
    public  handleTargetAccept() {
        this._logger.log("handle target accept");
        this._rtc.handleTargetAccept();

    }
    /**
     * handle the stream on the target
     * @param message {Message}
     * 
     */
    public handleTargetStream(message: IMessage) {
        this._logger.log("handle target stream", message);
        this._rtc.handleTargetAccept(message);
    }
    
    /**
     * Answer the call
     * @param local {IHTMLMediaElement}
     * @param remote {IHTMLMediaElement}
     */
    public answerCall(params: ICallParams): void {
        this._logger.log.info("answer call", params);
        this._rtc.startCall(params);
        this.events.callEvent("answerCall")(this.events.callEvent("error"));
    }
    
    /**
     * End the current call
     */
    public endCall(): void {
        this._logger.log.info("ending call");
        this._rtc.reset();
        this.events.callEvent("endCall")();
    }

    

    private createCallSession() {
        this._logger.log.info("creating call session");
        this._rtc.createSession();
    }
    /**
     * Get the VideoWrapper for the local video
     * @returns {VideoWrapper}
     */
    public getLocalVideo(): IVideoWrapper {
        this._logger.log.info("getting local video");
        return this._rtc.getLocalVideo();
    }
    /**
     * Get the VideoWrapper for the remote video
     * @returns {VideoWrapper}
     */
    public getRemoteVideo(): IVideoWrapper {
        this._logger.log.info("getting remote video");
        return this._rtc.getRemoteVideo();
    }
    
    public on(eventName:string, action:Function) {
        this._logger.log.info("adding event", eventName);
        this.events.setEvent(eventName, action); 
    }


}
export default Client;