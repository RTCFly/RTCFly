import { injectable, inject } from 'inversify';
import { IMessenger } from '@rtcfly/messenger';
import { EventEmitter } from '@rtcfly/entities/eventemitter';
import { TYPES } from '@rtcfly/types';
import { IWebClient, IClientConfig } from '@rtcfly/interfaces';
@injectable()
export class GenericMessenger extends EventEmitter implements IMessenger{
    @inject(TYPES.WebClient) private _webClient: IWebClient;
    
    register(config:IClientConfig){
        super.emit('REGISTER');
    }
    invite(){
        super.emit('INVITE');
    }
    ack(){
        super.emit('ACK');
    }
    cancel(){
        super.emit('CANCEL');
    }
    options(){
        super.emit('OPTIONS');
    }
    prack(){
        super.emit('PRACK');
    }
    subscribe(){
        super.emit('SUBSCRIBE');
    }
    notify(){
        super.emit('NOTIFY');
    }
    publish(){
        super.emit('PUBLISH');
    }
    info(){
        super.emit('INFO');
    }
    refer(){
        super.emit('REFER');
    }
    message(){
        super.emit('MESSAGE');
    }
    update(){
        super.emit('UPDATE');
    }
    on(action:string, callback:Function){
        super.on(action, callback);
    }
}