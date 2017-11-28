class Handler {
    constructor(document, userName){
        this.document = document; 
        this.userName = userName; 
    }
    setOtherUserReference(core){
        this.otherUserCore = core; 
    }
    setCore(core){
        this.core = core; 
    }
    setOtherUserHandler(handler){
        this.otherUserHandler = handler;
    }
    emitIceCandidate(iceCandidate){
        
    }
    emitTargetAnswer(){
        
    }
    onPeerConnectionCreated(){
        
    }
    onCallInitialised(err){
        
    }
    call(_id, callback){
        this.otherUserHandler.onReceivePhoneCall();
    }
    endPhoneCall(onError){
        
    }
    answerPhoneCall(onError){
        
    }
    emitSenderDescription(sessionDescription){
        
    }
    rejectCall(){
        this.document.getElementById(this.userName + "-state").innerHTML = "Rejector";
        this.otherUserCore.onTargetReject(); 
    }
    onReceivePhoneCall(fields){
        console.log("onReceivePhoneCall")
        this.document.getElementById(this.userName + "-state").innerHTML = "Recieving call";
    }
}
export default Handler;