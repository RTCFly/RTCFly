import { injectable, inject } from 'inversify';
import { IWebClient, 
         IClientConfig,
         IMessageHandler } from '@rtcfly/interfaces';
         
import { EventEmitter } from '@rtcfly/entities/eventemitter';
import { TYPES } from '@rtcfly/types';
@injectable()
export class SipMessenger extends EventEmitter implements IMessageHandler {

    @inject(TYPES.WebClient) private _webClient: IWebClient;
    
    
    register(config:IClientConfig){
        
    }
    invite(){
        
    }
    ack(){
        
    }
    cancel(){
        
    }
    options(){
        
    }
    prack(){
        
    }
    subscribe(){
        
    }
    notify(){
        
    }
    publish(){
        
    }
    info(){
        
    }
    refer(){
        
    }
    message(){
        
    }
    update(){
        
    }
    answer(){
        
    }
    reject(){
        
    }
    iceCandidate(){
        
    }
    on(action:string, callback:Function){
        super.on(action, callback);
    }
}