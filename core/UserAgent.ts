import { injectable, inject } from 'inversify';

import { TYPES } from '@rtcfly/types';
import { IUserAgent, 
        IMessenger, 
        ICallParams, 
        IRTCService, 
        IErrorService, 
        IRTCConfiguration, 
        IRTCSession,
        IDataChannel } from '@rtcfly/interfaces';


@injectable()
export class UserAgent extends EventEmitter implements IUserAgent {
    
    @inject(TYPES.Messenger) private _messenger: IMessenger;
    @inject(TYPES.RTCService) private _rtcService :IRTCService;
    @inject(TYPES.ErrorService) private _errorService: IErrorService;
    
    call(params:ICallParams): void{
        //TODO implement user agent call
    }; 
    answer(params:ICallParams): void{
        //TODO implement user agent answer
    };
    reject(): void{
        //TODO implement user agent reject
    }; 
    createDataChannel():IDataChannel{
        //TODO implement user agent createDataChannel
        return {} as IDataChannel;
    };
    init(configuration:IRTCSession): void{
        this._rtcService.initSession(configuration.rtcConfiguration);
        this._messenger.register(configuration.clientConfig);
    }; 
    

}