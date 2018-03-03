export interface IUserAgent {
    call(params:ICallParams): void; 
    on(event:string, callback:Function): void; 
    answer(params:ICallParams): void;
    reject(): void; 
    createDataChannel():IDataChannel;
    init(configuration:IRTCConfiguration): void; 
}

export interface IRTCService {
    initSession();
    getDevices();
}

export interface IMessenger {
    register();
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
}
export interface IWebClient {
    send();
    connect();
    close();
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

export interface IRTCConfiguration {
    iceServers:Array<any>;
}