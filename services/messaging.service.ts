class MessagingService extends Event.EventEmitter {
    private _uri:string; 
    private _mode:MessagingClientTypeEnum;
    private _connection:WebSocket; 
    private _user:string; 
    private _messageFactory:MessageFactory;
    constructor({
        messageFactory
    }){
        this._messageFactory = messageFactory;
    }
    init(data:any){
        this._uri = data.uri; 
        this._ip = data.IP; 
        if(data.mode !== undefined){
            this._user = data.user; 
            if(data.mode === "SIP"){
                this._mode = MessagingClientTypeEnum.SIP; 
                this._messageFactory.init(this._user, this._mode, this._ip);
            } else {
                this._mode = MessagingClientTypeEnum.WS; 
            }
        }
        this._connection = new WebSocket(this._uri); 
        this._connection.onerror(err => {throw new err});
        this._connection.onmessage(event => this._onMessage);
        this._connection.onopen(event => this._onOpen);
        this._connection.onclose(event => this._onClose);
    }
    private _onMessage(event:Event){
        
    }
    private _onOpen(event:Event){
        const registerMessage = messageFactory(MessageEnum.REGISTER);
        this._connection.send(registerMessage.get(this._mode));
    }
    private _onClose(event:Event){
        
    }
}

export {
    MessagingClient
}