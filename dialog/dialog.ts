import { IDialog } from '@rtcfly/dialog';
import { DialogEventsEnum } from '@rtcfly/dialog-events-enum';

export default class Dialog implements IDialog {
    private _dialogId:string|number;
    constructor(userId:string)
    constructor(inviteDto:IInviteDto) {
        if(typeof userId === 'string') {
            this._invite(userId);
        } else {
            this._answer(inviteDto);
        }
    }
    
    private _invite(userId:string) {
        
    }
    
    private _answer(inviteDto:IInviteDto) {
        this._dialogId = inviteDto.dialogId; 
        
    }
    
    public getId(): string|number {
        return this._dialogId;
    }
    
    public on(event:DialogEventsEnum, callback:Function): void {
        
    }
    
    
}