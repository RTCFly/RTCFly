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
    
}