import { injectable, inject } from 'inversify';
import { IMessenger } from '@rtcfly/messenger';
import { EventEmitter } from '@rtcfly/entities/eventemitter';
import { TYPES } from '@rtcfly/types';
import { IWebClient, IClientConfig } from '@rtcfly/interfaces';
@injectable()
export class GenericMessenger extends EventEmitter implements IMessenger{
    @inject(TYPES.WebClient) private _webClient: IWebClient;
    
    register(config:IClientConfig){
        this.emit('REGISTER');
    }
    invite(){
        this.emit('INVITE');
    }
    ack(){
        this.emit('ACK');
    }
    cancel(){
        this.emit('CANCEL');
    }
    options(){
        this.emit('OPTIONS');
    }
    prack(){
        this.emit('PRACK');
    }
    subscribe(){
        this.emit('SUBSCRIBE');
    }
    notify(){
        this.emit('NOTIFY');
    }
    publish(){
        this.emit('PUBLISH');
    }
    info(){
        this.emit('INFO');
    }
    refer(){
        this.emit('REFER');
    }
    message(){
        this.emit('MESSAGE');
    }
    update(){
        this.emit('UPDATE');
    }
}