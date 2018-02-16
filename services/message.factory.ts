import { MessageEnum } from '../entities/MessageEnum';

class MessageFactory {
    private _mode:MessagingClientTypeEnum; 
    private _user:string; 
    private _ip:string; 
    
    public init(user:string, mode:MessagingClientTypeEnum, ip:string) : void {
        this._user = user; 
        this._mode = mode;
        this._ip = ip; 
    }
    public get(type:MessageEnum, data:any){
        switch(type){
            case MessageEnum.REGISTER:
                break; 
        }    
    }
}

export { MessageFactory };