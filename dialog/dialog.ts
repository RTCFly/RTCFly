import { IDialog } from '@rtcfly/dialog';
import { DialogEventsEnum } from '@rtcfly/dialog-events-enum';

export default class Dialog implements IDialog {
    
    private _dialogId:string;
    private _messenger: IMessenger;
    private _rtcService: IRTCService;
    private _rtcSession: IRTCSession; 
    private _generator: any; 
    private _state:DialogStateEnum;
    
    constructor(deps:any, inviteDto:IInviteDto)
    constructor(deps:any, callParams:ICallParams) {
        const {
            messenger,
            rtcService
        } = deps;
        this._messenger = messenger;
        this._rtcService = rtcService;
        if(callParams) {
            this._invite(callParams);
        } else {
            this._answer(inviteDto);
        }
        
    }
    private _setState(state:DialogStateEnum): void {
        this._state = state;
    }
    private async * _inviteFlow(callParams:ICallParams){
        this._rtcSession = await this._rtcService.createSession(this._dialogId, callParams); 
        const offer = await this._rtcSession.getOffer(); 
        this._setState(DialogStateEnum.INVITING);
        yield this._messenger.invite(this._dialogId, offer, callParams.targetId);
        const answer = yield this._setState(DialogStateEnum.TRYING);
        this._setState(DialogStateEnum.OK);
        this._rtcSession.setAnswer(answer);
        this._messenger.ack(this._dialogId);
    }
    
    private async * _answerFlow(callParams:ICallParams, inviteDto:IInviteDto){
        const sdp = await this._rtcService.createSession(callParams, inviteDto);
        this._messenger.answer(this._dialogId, sdp);
        this._setState(DialogStateEnum.ANSWER);
        yield this._setState(DialogStateEnum.ACK);
    }
    
    private _getGuid():string {
        const key = 'llanfairp-wllgwyngyllgogerychwyrndrobwl-lllantysiliogogogoch_llanfairpwllgwyngyllgogerychwyrndr-obwllllantysiliogogogoch';
        let size = 40;
        let id = '';
        const bytes = crypto.getRandomValues(new Uint8Array(size))
          while (0 < size--) {
            id += key[bytes[size] & 63]
          }
          return id
        
    }
    
    private async _invite(callParams:ICallParams) {
        this._generator = this._inviteFlow(callParams);
        this._dialogId = this._getGuid();
        this._messenger.on(this._dialogId, this._generator.bind(this));
        this._generator.next();
    }
    
    private _answer(inviteDto:IInviteDto) {
        this._generator = this._answerFlow(callParams);
    }
    
    public async answer(callParams: ICallParams): void { 
        this._.generator.next(callParams);
    }
    
    public getId(): string|number {
        return this._dialogId;
    }
    
    public on(event:DialogEventsEnum, callback:Function): void {
        
    }
    
    
}