import { injectable, inject } from 'inversify';
import { IWebClient, 
         IClientConfig,
         IMessenger } from '@rtcfly/interfaces';
import { TYPES } from '@rtcfly/types';
@injectable()
export class SipMessenger implements IMessenger {

    @inject(TYPES.WebClient) private _webClient: IWebClient;
    
    
    register(config:IClientConfig){
        
    }
    invite(){
        
    };
    ack(){
        
    };
    cancel(){
        
    };
    options(){
        
    };
    prack(){
        
    };
    subscribe(){
        
    };
    notify(){
        
    };
    publish(){
        
    };
    info(){
        
    };
    refer(){
        
    };
    message(){
        
    };
    update(){
        
    };
}