import { VideoWrapper } from '@rtcfly/entities/videowrapper';
import { IHTMLMediaElement,
         IVideoWrapper, 
         ICallParams, 
         IMediaWrapper } from '@rtcfly/interfaces';
export default class MediaWrapper implements IMediaWrapper {
    localVideo:IVideoWrapper; 
    remoteVideo:IVideoWrapper;
    
    setVideoElements(params:ICallParams) : void{
        if(params.localElement){
            this.localVideo = new VideoWrapper(params.localElement, true);
        } else {
            this.localVideo = null;
        }
        
        if(params.remoteElement){
            this.remoteVideo = new VideoWrapper(params.remoteElement);
        } else {
            this.remoteVideo = null;
        }
    }
    
    setVideoStream(streams:any){
        if(streams.localStream && this.localVideo){
            this.localVideo.setStream(streams.localStream, true);
        }
        if(streams.remoteStream && this.remoteVideo){
            this.remoteVideo.setStream(streams.remoteStream, false);
        }
    }
    
}