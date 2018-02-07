

class MessageFactory {
    private _mode:MessagingClientTypeEnum; 
    private _user:string; 
    
    constructor(user:string, mode:MessagingClientTypeEnum){
        this._user = user; 
        this._mode = mode;
    }
    get(type:MessageEnum, data:any){
        switch(type){
            case MessageEnum.REGISTER:
                break; 
        }    
    }
}

export { messageFactory };