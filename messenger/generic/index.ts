import { injectable, inject } from 'inversify';
import { IMessenger } from '@rtcfly/messenger';
import { EventEmitter } from '@rtcfly/entities/eventemitter';
import { TYPES } from '@rtcfly/types';
import { IWebClient, IClientConfig } from '@rtcfly/interfaces';
@injectable()
export class GenericMessenger extends EventEmitter implements IMessenger{
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
    
}