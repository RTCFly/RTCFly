declare interface IVideoWrapper {
    getElement(): IHTMLMediaElement;
    pause():void; 
    play():Promise<any>;
    setStream(stream: IMediaStream, muted? : boolean): void;
    stop() : void; 
}