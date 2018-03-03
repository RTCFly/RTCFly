export interface IUserAgent {
    call(params:ICallParams): void; 
    answer(params:ICallParams): void;
    reject(): void; 
    createDataChannel():IDataChannel;
    init(configuration:IRTCSession): void; 
    getMessenger(): IMessenger;
}
export interface IDataChannel {
    
}
export interface IRTCService {
    initSession(config:IRTCConfiguration);
    getDevices();
}

export interface IMessenger {
    register(config:IClientConfig);
    invite();
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
    on(event:string, callback:Function);
}
export interface IWindowWebSocket{
    close();
    send();
}
export interface IWebClient {
    handleMessage();
    
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
}

export interface IHTMLMediaElement{
     play() : void;
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
}