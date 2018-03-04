import { injectable, inject } from 'inversify';

import { TYPES } from '@rtcfly/types';
import { IUserAgent, 
        IMessageHandler, 
        ICallParams, 
        IRTCService, 
        IErrorService, 
        IRTCConfiguration, 
        IRTCSession,
        IDataChannel } from '@rtcfly/interfaces';


@injectable()
export class UserAgent implements IUserAgent {
    
    @inject(TYPES.Messenger) private _messenger: IMessageHandler;
    @inject(TYPES.RTCService) private _rtcService :IRTCService;
    @inject(TYPES.ErrorService) private _errorService: IErrorService;
    
    
    
    
    call(params:ICallParams): void{
        this._rtcService.initSession({
            localElement:params.localElement,
            remoteElement:params.remoteElement
        });
        if(params.id === undefined){
            this._errorService.invalidCallTarget(params.id);
        }
        this._messenger.invite(params.id);
    } 
    answer(params:ICallParams): void{
        this._rtcService.initSession({
            localElement:params.localElement,
            remoteElement:params.remoteElement
        });
        this._messenger.answer();
    }
    reject(): void{
        this._messenger.reject();
    }
    createDataChannel():IDataChannel{
        return {} as IDataChannel;
    }
    init(configuration:IRTCSession): void{
        this._rtcService.init(configuration.rtcConfiguration);
        this._messenger.register(configuration.clientConfig);
    } 
    
    getMessenger() :IMessageHandler{
        return this._messenger;
    }
    
}