import { injectable, inject } from "inversify";
import { IRTCConfiguration,
         IRTCService } from '@rtcfly/interfaces';
@injectable()
export default class WebRTC implements IRTCService {
    private _config:IRTCConfiguration;
    
    initSession(config:IRTCConfiguration){
        this._config = config; 
    }
    getDevices(){
        
    }
    
}