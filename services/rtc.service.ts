class RTCService implements IRTC{
    private _initLocalSession:Function;
    public RTCPeerConnection;
    private _enumerateDevices;
    private _events:IEvents;
    private onDeviceChange; 
    private _mediaConstraints :any; 
    private _iceServers:Array<any> = []; 
    private _logger; 
    private _VideoWrapper:any;
    public peerConnection: IPeerConnection;
    
    private _localVideo: IVideoWrapper;
    private _remoteVideo: IVideoWrapper;
    
    
    constructor({
        getUserMedia, 
        RTCPeerConnection, 
        enumerateDevices,
        onDeviceChange,
        logger,
        events,
        VideoWrapper
    }){
        this._initLocalSession = this.adaptGetUserMedia(getUserMedia); 
        this.RTCPeerConnection = RTCPeerConnection;
        this._enumerateDevices = enumerateDevices;
        this.onDeviceChange = onDeviceChange;
        this._logger = logger; 
        this._events = events; 
        this._VideoWrapper = VideoWrapper;
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
                    this._logger.error("getUserMedia failed", err);
                    this._events.callEvent("userMediaError")(err);
                });
            } else {
                this.setupPeerConnection(null, remoteDescription);
            }
        };
    }
    public startCall(params:ICallParams): void {
        const {video,audio,localElement,remoteElement,id} = params; 
        this._localVideo = null;
        this._remoteVideo = null;
        this._mediaConstraints = {
            audio, 
            video
        };
        if (localElement !== undefined){
            this._logger.log("setting local element", localElement);
            this._localVideo = new this._VideoWrapper(localElement);
        }
        if (remoteElement !== undefined){
            this._logger.log("setting remote element", remoteElement);
            this._remoteVideo = new this._VideoWrapper(remoteElement);
        }
    }
    public setRemoteDescription(data:any){
            this.peerConnection.setRemoteDescription(data).catch(this._events.callEvent("error"));
    }
    public reset(){
        if(this.peerConnection){
            this.peerConnection = null; 
        }
    }
    public processIceCandidate(message:IMessage){
        this._logger.log("processIceCandidate", message);
        
        //TODO use correct enum 
         if (message.Type === "icecandidate") {
             this._logger.log("addIceCandidate", message);
            if (this.peerConnection) {
                this.peerConnection.addIceCandidate(message.data).catch(err=>{
                    this._logger.log("could not add ice candidate",err);
                    this._events.callEvent("error")(err);
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
        this._logger.log("creating target session", remoteDescription);
        this.peerConnection.setRemoteDescription(remoteDescription).then(() => {
            this._logger.log("remote description set");
            this.peerConnection.createAnswer().then((answer: Object) => {
                this._logger.log("creating answer", answer);
                this.peerConnection.setLocalDescription(answer).catch((setLocalDescriptionError: Error) => {
                    this._logger.log("local description set");
                    this._events.callEvent("error")(setLocalDescriptionError);
                });
                this._events.callEvent("emitTargetAnswer")(answer);
            }).catch((createAnswerError: Error) => {
                this._logger.error("create answer error", createAnswerError);
                this._events.callEvent("error")(createAnswerError);
            });
        }).catch((setRemoteDescriptionError: Error) => {
                this._logger.error("set remote description error", setRemoteDescriptionError);
            this._events.callEvent("error")(setRemoteDescriptionError);
        });


    }
    public createSession (){
        
        this.peerConnection.createOffer().then((offer:any)=>{
            this._logger.debug("created offer", offer);
            this.peerConnection.setLocalDescription(offer);
            this._events.callEvent("emitSenderDescription")(offer);
            this.peerConnection.setLocalDescription(offer);
        }).catch((err:Error)=>{
            this._logger.error("create call session error", err);
            this._events.callEvent("error")(err);
        });
    }
    public setupPeerConnection(stream?: IMediaStream, remoteDescription?: Object): void {
        this._logger.log("setting peerConnection", stream, remoteDescription);
        this.peerConnection = this.createPeerConnection({
            iceServers:this._iceServers
        });
        this.peerConnection.ondatachannel = event => this._events.callEvent("datachannel")(event);
        this._events.callEvent("peerConnectionCreated")();
        this.setPeerConnectionCallbacks();
        this._logger.log("adding stream");
        if(stream !== undefined){
            this.peerConnection.addStream(stream);
        }
        if (remoteDescription) {
            this.createTargetSession(remoteDescription);
        }
        else {
            this.createSession();
        }
    }

    public setPeerConnectionCallbacks(): void {
        this._logger.log("setting peerConnection callbacks");
        this.peerConnection.onicecandidate = function (event: any)  {
            this._logger.log("add ice candidate", event);
            this._events.callEvent("emitIceCandidate")(event.candidate);
        }.bind(this);
        this.peerConnection.onaddstream = function (stream: any) {
            this._logger.log("on add remote stream", stream);
            if (this._remoteVideo) {
                this._remoteVideo.pause();
                this._remoteVideo.setStream(stream.stream);
                this._remoteVideo.play();
            }
        }.bind(this);
    }
    public handleTargetStream(message: IMessage){
        this.processIceCandidate(message);
        //TODO Use correct enum
        if (message.Type === "sessiondescription") {
            this._logger.log("handle session description");
            this._initLocalSession(message.data);
        }
    }
    public handleSenderStream(message:IMessage): void {
        this.processIceCandidate(message);
        //TODO Use correct enum
        if (message.Type === "sessiondescription") {
            this._logger.log("handle session description", message);
            this.setRemoteDescription(message.data);
        }
    }
    public handleTargetAccept(): void {
        this._initLocalSession();
    }
    public getLocalVideo(): IVideoWrapper{
        if(this._localVideo){
            return this._localVideo;
        }
        return undefined;
    }
    public getRemoteVideo(): IVideoWrapper{
        if(this._remoteVideo){
            return this._remoteVideo;
        }
        return undefined;
    }
}

export {
    RTCService
};