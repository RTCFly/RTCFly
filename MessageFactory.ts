

class MessageFactory {
    private _mode:MessagingClientTypeEnum; 
    private _user:string; 
    private _ip:string; 
    
    constructor(user:string, mode:MessagingClientTypeEnum, ip:string){
        this._user = user; 
        this._mode = mode;
        this._ip = ip; 
    }
    get(type:MessageEnum, data:any){
        switch(type){
            case MessageEnum.REGISTER:
                break; 
        }    
    }
}

export { messageFactory };