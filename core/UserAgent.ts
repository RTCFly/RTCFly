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
import { UserAgentEventEnum } from '@rtcfly/user-agent-event.enum';


@injectable()
export class UserAgent extends events.EventEmitter implements IUserAgent {
    
    @inject(TYPES.Messenger) private _messenger: IMessenger;
    @inject(TYPES.ErrorService) private _errorService: IErrorService;
    @inject(TYPES.DialogFactory) private _dialogFactory: IDialogFactory;

    public call(params:ICallParams): IDialog {
        params.caller = true;
        if(params.id === undefined){
            return this._errorService.invalidCallTarget(params.id);
        }
        return this._dialogFactory.createInvite(params);
    } 
    
    public async init(configuration:IRTCSession): void{
        this._rtcService.init(configuration.rtcConfiguration);
        const agentStream = await this._messenger.register(configuration.clientConfig);
        agentStream.on(AgentStreamEventEnum.ReceivingCall, dialog => this.emit(UserAgentEventEnum.ReceivingCall, dialog));
    } 
}