class RTC implements IRTC{
    private _initLocalSession:Function;
    private _RTCPeerConnection;
    private _enumerateDevices;
    private onDeviceChange; 
    private _iceServers:Array<any> = []; 
    private logger; 
    public peerConnection: IPeerConnection;
    
    
    constructor({
        getUserMedia, 
        RTCPeerConnection, 
        enumerateDevices,
        onDeviceChange,
        logger
    }){
        this.initLocalSession = this._rtc.adaptGetUserMedia(getUserMedia); 
        this.RTCPeerConnection = RTCPeerConnection;
        this.enumerateDevices = enumerateDevices;
        this.onDeviceChange = onDeviceChange;
        this._logger = logger; 
    }
    public init (data:any){
        if(data.iceServers){
            this._iceServers = data.iceServers;
        } else {
            this._iceServers = [];
        }
    }
    createPeerConnection(config){
        return new this.RTCPeerConnection(config);
    }
    private adaptGetUserMedia(getUserMedia:Function){
        return remoteDescription =>{
            if(this._mediaConstraints.video !== undefined 
            || this._mediaConstraints.audio !== undefined){
                getUserMedia(this._mediaConstraints).then((stream:any)=>{
                    this._logger.log("getUserMedia", stream);
                if (this._localVideo) {
                    this._localVideo.setStream(stream, true);
                    this._localVideo.play();
                }
                this.setupPeerConnection(stream, remoteDescription);
                }).catch(err =>{
                    log.error("getUserMedia failed", err);
                    this.events.callEvent("userMediaError")(err);
                });
            } else {
                this.setupPeerConnection(null, remoteDescription);
            }
        };
    }
    public startCall(params:ICallParams, callback:string): void {
        const {video,audio,localElement,remoteElement,id} = params; 
        this._localVideo = null;
        this._remoteVideo = null;
        this._mediaConstraints = {
            audio, 
            video
        };
        if (localElement !== undefined){
            log.debug("setting local element", localElement);
            this._localVideo = new VideoWrapper(localElement);
        }
        if (remoteElement !== undefined){
            log.debug("setting remote element", remoteElement);
            this._remoteVideo = new VideoWrapper(remoteElement);
        }
    }
    public setRemoteDescription(data:any){
            this.peerConnection.setRemoteDescription(data).catch(this.events.callEvent("error"));
    }
    public reset(){
        if(this.peerConnection){
            this.peerConnection = null; 
        }
    }
    public processIceCandidate(message:Message){
        log.info("processIceCandidate", message);
         if (message.Type === MessageType.Candidate) {
             log.info("addIceCandidate", message);
            if (this.peerConnection) {
                this.peerConnection.addIceCandidate(message.data).catch(err=>{
                    this._logger.log("could not add ice candidate",err);
                    this.events.callEvent("error")(err);
                });
            }
        }
    }
    
    /**
     * Set up the target WebRTC session
     * Needs to be reimplemented with await
     * @param remoteDescription {RTCSessionDescription}
     */
    private createTargetSession(remoteDescription: Object) {
        log.info("creating target session", remoteDescription);
        this.peerConnection.setRemoteDescription(remoteDescription).then(() => {
            log.info("remote description set");
            this.peerConnection.createAnswer().then((answer: Object) => {
                log.info("creating answer", answer);
                this.peerConnection.setLocalDescription(answer).catch((setLocalDescriptionError: Error) => {
                    log.info("local description set");
                    this.events.callEvent("error")(setLocalDescriptionError);
                });
                this.events.callEvent("emitTargetAnswer")(answer);
            }).catch((createAnswerError: Error) => {
                log.error("create answer error", createAnswerError);
                this.events.callEvent("error")(createAnswerError);
            });
        }).catch((setRemoteDescriptionError: Error) => {
                log.error("set remote description error", setRemoteDescriptionError);
            this.events.callEvent("error")(setRemoteDescriptionError);
        });


    }
    public createSession (){
        
        this.peerConnection.createOffer().then((offer:any)=>{
            log.info("created offer", offer);
            this.peerConnection.setLocalDescription(offer);
            this.events.callEvent("emitSenderDescription")(offer);
            this.peerConnection.setLocalDescription(offer);
        }).catch((err:Error)=>{
            log.error("create call session error", err);
            this.events.callEvent("error")(err);
        });
    }
    public setupPeerConnection(stream?: IMediaStream, remoteDescription?: Object): void {
        log.info("setting peerConnection", stream, remoteDescription);
        this.peerConnection = this.createPeerConnection({
            iceServers:this._iceServers
        });
        this.peerConnection.ondatachannel = event => this.events.callEvent("datachannel")(event);
        this.events.callEvent("peerConnectionCreated")();
        this.setPeerConnectionCallbacks();
        log.info("adding stream");
        if(stream !== undefined){
            this.peerConnection.addStream(stream);
        }
        if (remoteDescription) {
            this.createTargetSession(remoteDescription);
        }
        else {
            this.createCallSession();
        }
    }

    public setPeerConnectionCallbacks(): void {
        log.info("setting peerConnection callbacks");
        this.peerConnection.onicecandidate = function (event: any)  {
            log.info("add ice candidate", event);
            this.events.callEvent("emitIceCandidate")(event.candidate);
        }.bind(this);
        this.peerConnection.onaddstream = function (stream: any) {
            log.info("on add remote stream", stream);
            if (this._remoteVideo) {
                this._remoteVideo.pause();
                this._remoteVideo.setStream(stream.stream);
                this._remoteVideo.play();
            }
        }.bind(this);
    }
    private handleTargetStream(message: Message){
        this.processIceCandidate(message);
        if (message.Type === MessageType.SessionDescription) {
            this._logger.log("handle session description");
            this.initLocalSession(data.message);
        }
    }
    public handleSenderStream(message:Message): void {
        this.processIceCandidate(message);
        if (message.Type === MessageType.SessionDescription) {
            this._logger.log("handle session description", message);
            this.setRemoteDescription(message.data);
        }
    }
    private handleTargetAccept(): void {
        this._initLocalSession();
    }
}

export {
    RTCService
};