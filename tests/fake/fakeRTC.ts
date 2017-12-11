import PeerConnection from './PeerConnection';
class fakeRTC implements IRTC{
    public getUserMedia;
    public RTCPeerConnection;
    constructor(getUserMedia, RTCPeerConnection){
        this.getUserMedia = getUserMedia;
        this.RTCPeerConnection = PeerConnection; 
    }
    createPeerConnection(config){
        return new this.RTCPeerConnection(config); 
    }
}
export default new fakeRTC(()=>null, PeerConnection);