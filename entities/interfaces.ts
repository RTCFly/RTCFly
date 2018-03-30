export interface IUserAgent {
    call(params:ICallParams): void; 
    answer(params:ICallParams): void;
    reject(): void; 
    createDataChannel():IDataChannel;
    init(configuration:IRTCSession): void; 
    getMessenger(): IMessageHandler;
}
export interface IDataChannel {
    
}
// export interface IFlyAdapter {
    
//   RTCPeerConnection();
//   RTCDataChannel();
//   RTCDataChannelEvent();
//   RTCSessionDescription(); 
//   RTCSessionDescriptionCallback();
//   RTCStatsReport();
//   RTCIceCandidate(); 
//   RTCPeerConnectionIceEvent();
//   RTCRtpSender(); 
//   RTCRtpReceiver();
//   RTCRtpContributingSource(); 
//   RTCConfiguration();
//   RTCSctpTransport();
//   RTCIdentityAssertion();
//   RTCIdentityEvent();
//   RTCIdentityErrorEvent();
//   RTCCertificate();
//   getUserMedia();
// }
export interface IRTCService extends IEventEmitter {
    init(config:IRTCConfiguration);
    initSession(params:any);
    getDevices();
    on(action:string, callback:Function);
}
export interface IEventEmitter {
  on(action:string, callback:Function):void;
  emit(action:string, data?:any): void
}

export interface IMessageHandler {
    register(config:IClientConfig);
    invite(id:string);
    //Sip Methods
    ack();
    cancel();
    options();
    prack();
    subscribe();
    notify();
    publish();
    info();
    refer();
    message();
    update();
    
    //Custom
    answer();
    reject();
    iceCandidate(iceCandidate:any);
    
    on(action:string, callback:Function);
}
export interface IMediaWrapper {
    localVideo:IVideoWrapper;
    remoteVideo:IVideoWrapper;
    setVideoElements(elements:any);
}

export interface IVideoWrapper {
    streamMuted :boolean;
    toggleMute ():void;
    getElement(): IHTMLMediaElement;
    pause() : void;
    play(): Promise<any> ;
    setStream(stream: IMediaStream, muted? : boolean) : void ;
    stop():void;
}
export interface IWindowWebSocket{
    close();
    send();
}
export interface IWebClient {
    sendMessage();
    recieveMessage();
    
}
export interface IIPService {
    getIP():string;
}

export interface ICallParams {
    id:string; 
    localElement: IHTMLMediaElement;
    remoteElement: IHTMLMediaElement;
    video:boolean; 
    audio:boolean; 
    caller?:boolean;
}

export interface IHTMLMediaElement{
     play() : Promise<any>;
     pause() : void;
     paused: boolean;
     muted: boolean;
     srcObject: IMediaStream;
}


export interface IMediaStream {
    stream: Object;
}

export interface IRTCSession {
    rtcConfiguration:IRTCConfiguration;
    clientConfig:IClientConfig;
}
export interface IRTCConfiguration {
    iceServers:Array<any>;
}


export interface IClientConfig {
    ServerURI:string;
}

export interface IErrorService {
    missingConfig();
    invalidConfig(missingField:string);
    invalidCallTarget(callTarget:string);
}