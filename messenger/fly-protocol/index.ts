import { injectable, inject } from 'inversify';
import { IWebClient, 
         IClientConfig,
         IMessenger } from '@rtcfly/interfaces';
         
import { EventEmitter } from '@rtcfly/eventemitter';
import { TYPES } from '@rtcfly/types';

import { MessageTypeEnum } from '@rtcfly/message-types-enum';
@injectable()
export class FlyProtocolMessenger extends EventEmitter implements IMessenger {

    @inject(TYPES.WebClient) private _webClient: IWebClient;
    
    
    register(userId:string|number){
        this._webClient.sendMessage({
            type: MessageTypeEnum.register,
            userId
        });
    }
    invite(targetId:string|number): IDialog {
        
    }
    ack(dialogId: string|number){
        this._webClient.sendMessage({
            type:MessageTypeEnum.ack,
            dialogId
        });
    }
    cancel(dialogId: string|number){
        this._webClient.sendMessage({
            type:MessageTypeEnum.cancel,
            dialogId
        });
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