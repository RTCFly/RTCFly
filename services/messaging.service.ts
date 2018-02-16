import { MessageEnum } from '../entities/MessageEnum';
class MessagingService {
    private _uri:string; 
    private _mode:MessagingClientTypeEnum;
    private _connection:any; 
    private _user:string; 
    private _messageFactory:any;
    private _WebSocket:any; 
    private _ip:string; 
    constructor({
        messageFactory,
        WebSocket
    }){
        this._messageFactory = messageFactory;
        this._WebSocket = WebSocket;
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
        this._connection = new this._WebSocket(this._uri); 
        this._connection.onerror(err => {throw new err});
        this._connection.onmessage(event => this._onMessage);
        this._connection.onopen(event => this._onOpen);
        this._connection.onclose(event => this._onClose);
    }
    private _onMessage(event:IEvent){
        
    }
    private _onOpen(event:IEvent){
        const registerMessage = this._messageFactory(MessageEnum.REGISTER);
        this._connection.send(registerMessage.get(this._mode));
    }
    private _onClose(event:IEvent){
        
    }
}

export {
    MessagingService
}