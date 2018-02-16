import { MessageEnum } from './MessageEnum';

let CSeq = 0; 
export enum MessageDirection {
    Sender,
    Target
}
export enum MessageType {
    Candidate,
    SessionDescription,
    Register
}
// REGISTER sip:domain.com SIP/2.0
// Via: SIP/2.0/WS 192.168.253.177;branch=z9hG4bK5696513
// Max-Forwards: 70
// To: <sip:username@domain.com>
// From: "user name" <sip:username@domain.com>;tag=t9a358bps2
// Call-ID: 2ehc6n13ee2vs34phrlm4a
// CSeq: 84 REGISTER
// Contact: <sip:dlnqqpfq@192.168.253.177;transport=ws>;reg-id=1;+sip.instance="<urn:uuid:ac545210-918c-4971-b316-a85910f7b65b>";expires=600
// Allow: ACK,CANCEL,BYE,OPTIONS,INFO,NOTIFY,INVITE
// Supported: path,gruu,outbound
// User-Agent: SIP.js/0.7.1
// Content-Length: 0

//http://www.siptutorial.net/SIP/request.html
export class Message {
    
    public Direction: MessageDirection;
    public Type: MessageType;
    public data: Object;
    private _mode:MessagingClientTypeEnum;
    private _uri:string; 
    private _ip:string;
    constructor(uri:string, ip:string){
        this._uri = uri; 
        this._ip = ip; 
    }
    
    
    private _getJSON() : string {
        return JSON.stringify(this);
    }
    private _getSipHeader(messageType: MessageEnum)  : string {
        let header : string = messageType + " " + this._uri + " SIP/2.0\n";
        header += "Via: SIP/2.0/WS " + this._ip + ";\n";
        header += "Max-Forwards: 70\n";
        
        CSeq++;
        header += "CSeq: " + CSeq + " " + messageType + "\n";
        
        header += "Allow: ACK,CANCEL,BYE,OPTIONS,INFO,NOTIFY,INVITE\n";
        
        
        header += "User-Agent: RTCFly/1.0.0\n";
        header += "Content-Length: 0";
        
        return header;
     
    }
    private _getSIP() : string {
        
        return "";
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
    
    private _getSip():string {
        //create generic SIP message stuff
       // super(); 
        //create specific stuff for this message type
        return "";
    }
    
}


