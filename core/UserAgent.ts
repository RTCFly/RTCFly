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
    
    private _messenger: IMessageHandler;
    private _rtcService :IRTCService;
    private _errorService: IErrorService;
    
    
     public constructor(
	    @inject(TYPES.Messenger) messenger: IMessageHandler,
	    @inject(TYPES.RTCService) rtcService: IRTCService,
	    @inject(TYPES.ErrorService) errorService: IErrorService
    ) {
        this._messenger = messenger;
        this._rtcService = rtcService;
        this._errorService = errorService;
        
        this._rtcService.on('iceCandidate', iceCandidate => 
           this._messenger.iceCandidate(iceCandidate));
    }
    
    
    call(params:ICallParams): void{
        params.caller = true;
        if(params.id === undefined){
            return this._errorService.invalidCallTarget(params.id);
        }
        this._rtcService.initSession(params).then(offer => this._messenger.invite(params.id, offer));

        this._messenger.invite(params.id);
    } 
    answer(params:ICallParams): void{
        params.caller = false;
        this._rtcService.initSession({
            localElement:params.localElement,
            remoteElement:params.remoteElement
        }).then(offer => this._messenger.answer(offer));
        
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