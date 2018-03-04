import { injectable, inject } from "inversify";
import { IRTCConfiguration,
         IRTCService,
         IMediaWrapper,
         ICallParams } from '@rtcfly/interfaces';
import { TYPES } from '@rtcfly/types';
@injectable()
export default class WebRTC implements IRTCService {
    
    @inject(TYPES.MediaWrapper) private _mediaWrapper: IMediaWrapper;
    private _config:IRTCConfiguration;
    
    init(config: IRTCConfiguration){
        this._config = config;
    }
    initSession(elements:any){ 
        this._mediaWrapper.setVideoElements(elements);
    }
    getDevices(){
        
    }
    getMedia():IMediaWrapper{
        return this._mediaWrapper;
    }
    
}