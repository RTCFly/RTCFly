
export default class VideoWrapper implements IVideoWrapper {
    /**
     * Wrap video to allow stabler manipulation
     * @param video {HTMLElement}
     */
    private element: IHTMLMediaElement;
    private stream: any;
    constructor ( video: IHTMLMediaElement ){
        if( !video ) {
            throw new Error( "Video element not found" );
        } else {
            this.element = video;
        }
    }

    /**
     * Get the raw video element
     * @returns {IHTMLMediaElement}
     */
    public getElement(): IHTMLMediaElement{
        return this.element;
    }
    /**
     * Pause the video element
     */
    public pause() : void {
        if (!this.element.paused) {
            this.element.pause();
        }
    }

    /**
     * Play the video element
     */
    public async play() {
        return await this.element.play();
    }

    /**
     * Set the video stream
     * @param stream {MediaStream}
     * @param muted {boolean}
     */
    public setStream(stream: IMediaStream, muted? : boolean) : void {
        this.element.srcObject = stream;
        this.stream = stream; 
        if( muted !== undefined ) {
            this.element.muted = muted;
        } else {
            this.element.muted = false;
        }
    }
    public stop(){
        if(this.stream){
            this.stream.getVideoTracks().forEach(stream => stream.stop());
            this.stream.getAudioTracks().forEach(stream => stream.stop());
        }
    }
}
export {
    VideoWrapper
};