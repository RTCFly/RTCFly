
export default class DataChannel {
    
    
    private name:string;
    private dataChannel:any;
    private peerConnection:any;
    private eventMap = {}; 
    private options:any;
    
    
    
    constructor(options:any, peerConnection){
        this.name = options.name;
        delete options.name; 
        this.options = options; 
    }
    public createDataChannel(){
        this.dataChannel = this.peerConnection.createDataChannel(this.name, this. options);
        
    }
    public setDataChannel(event){
        this.dataChannel = event.channel; 
    }
    private setDataChannelEvents(){
        this.dataChannel.onopen = event => this.callEvent("open")(event); 
        this.dataChannel.onclose = event => this.callEvent("close")(event);
        this.dataChannel.onmessage = event => this.callEvent("message")(event);
    }
    callEvent(event){
        if(this.eventMap[event]){
            return this.eventMap[event];
        } else {
            return function(){}
        }
    }
}