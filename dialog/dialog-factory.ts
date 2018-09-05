import { IDialogFactory, IDialog } from '@rtcfly/interfaces';
import { Dialog } from '@rtcfly/dialog';
@injectable()
export default class DialogFacotry implements IDialogFactory {
    
    @inject(TYPES.Messenger) private _messenger: IMessenger;

    createAnswer(inviteDto:IInviteDto): IDialog{
        return new Dialog(inviteDto);
    }
    createInvite(userId: string|number): IDialog{
        return new Dialog(userId)
    }
}