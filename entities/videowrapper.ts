import { IHTMLMediaElement, IMediaStream, IVideoWrapper }  from '@rtcfly/interfaces';
export class VideoWrapper implements IVideoWrapper {
    /**
     * Wrap video to allow stabler manipulation
     * @param video {HTMLElement}
     */
    private element: IHTMLMediaElement;
    private stream: any;
    
    public streamMuted :boolean;
    constructor ( video: IHTMLMediaElement ){
        if( !video ) {
            throw new Error( "Video element not found" );
        } else {
            this.element = video;
        }
    }
    
    public toggleMute (){
        if(this.stream){
            this.stream.getAudioTracks().forEach(stream=>stream.enabled = !stream.enabled);
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
    public  play(): Promise<any> {
        return  this.element.play();
    }

    /**
     * Set the video stream
     * @param stream {MediaStream}
     * @param muted {boolean} whether to set the video element muted attribute
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