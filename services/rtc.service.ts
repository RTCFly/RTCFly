class RTC implements IRTC{
    public getUserMedia;
    public RTCPeerConnection;
    public enumerateDevices;
    public onDeviceChange; 
    private logger; 
    public peerConnection: IPeerConnection;
    constructor({
        getUserMedia, 
        RTCPeerConnection, 
        enumerateDevices,
        onDeviceChange,
        logger
    }){
        this.getUserMedia = getUserMedia; 
        this.RTCPeerConnection = RTCPeerConnection;
        this.enumerateDevices = enumerateDevices;
        this.onDeviceChange = onDeviceChange;
        this._logger = logger; 
    }
    createPeerConnection(config){
        return new this.RTCPeerConnection(config);
    }
    public rejectCall(){
        this.peerConnection = null;
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
        this.peerConnection = this._rtc.createPeerConnection({
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

}

export {
    RTCService
};