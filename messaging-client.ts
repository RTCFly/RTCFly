class MessagingClient {
    private _uri:string; 
    private _mode:MessagingClientTypeEnum;
    constructor(){
        
    }
    init(data:any){
        this._uri = data.uri; 
        if(data.mode !== undefined){
            if(data.mode === "SIP"){
                this._mode = MessagingClientTypeEnum.SIP; 
            } else {
                this._mode = MessagingClientTypeEnum.WS; 
            }
        }
    }
}

export {
    MessagingClient
}