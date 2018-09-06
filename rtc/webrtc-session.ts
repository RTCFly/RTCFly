

export class WebRTCSession implements IRTCSession {
    private _peerConnection: IRTCPeerConnection; 
    private _callParams: ICallParams; 

    
    constructor({
        messenger
    }: any, dialogId:string, peerConnection:IRTCPeerConnection, callParams:ICallParams) {
        this._messenger = messenger; 
        
        this.peerConnection = peerConnection; 
        this._registerCallbacks(peerConnection);
    }
    
    public setLocalStream(stream:any): void {
        stream.forEach(track => this._peerConnection.addTrack(track, stream));
    }
    public getOffer(): void {
        return this._peerConnection.createOffer();
    }
    public setAnswer(answer:string): void {
        this._peerConnection.setRemoteDescription(answer);
    }
    
    
    private _registerCallbacks(peerConnection:IRTCPeerConnection): void {
        thi
    }
}