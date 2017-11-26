export default class HTMLMediaElement implements IHTMLMediaElement {
    paused: boolean;
    muted: boolean;
    srcObject: IMediaStream;
    constructor(){
        this.paused = true;
        this.muted = false;
    }
    public play() : void {
        this.paused = false;
    }
    public pause() : void {
        this.paused = true;
    }
}