import { IDialogFactory, IDialog } from '@rtcfly/interfaces';
import { Dialog } from '@rtcfly/dialog';
@injectable()
export default class DialogFactory implements IDialogFactory {
    
    @inject(TYPES.Messenger) private _messenger: IMessenger;
    @inject(TYPES.RTCService) private _rtcService: IRTCService;

    createAnswer(inviteDto:IInviteDto): IDialog{
        return new Dialog({
            messenger: this._messenger,
            rtcService:this._rtcService
        }, inviteDto);
    }
    createInvite(userId: string|number): IDialog{
        return new Dialog({
            messenger: this._messenger,
            rtcService:this._rtcService
        }, userId)
    }
}