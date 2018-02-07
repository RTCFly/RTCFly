export enum MessageDirection {
    Sender,
    Target
}
export enum MessageType {
    Candidate,
    SessionDescription,
    Register
}
export class Message {
    
    public Direction: MessageDirection;
    public Type: MessageType;
    public data: Object;
    private _mode:MessagingClientTypeEnum;
    
    private _getJSON() : string {
        return JSON.stringify(this);
    }
    
    private _getSip():string {
        
    }
    
    public get() : string {
        if(this._mode === MessagingClientTypeEnum.SIP){
            return this._getSIP(); 
        } else {
            return this._getJSON(); 
        }
    }
}

export class MessageRegister extends Message {
    
    constructor(){
    }
    
    private _getSip():string {
        //create generic SIP message stuff
        super(); 
        //create specific stuff for this message type
    }
    
}


