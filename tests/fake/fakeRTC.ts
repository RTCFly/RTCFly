import PeerConnection from './PeerConnection';
import enumerateDevices from './enumerateDevices';
class fakeRTC implements IRTC{
    public getUserMedia;
    public RTCPeerConnection;
    public enumerateDevices;
    constructor(getUserMedia, RTCPeerConnection, enumerateDevices){
        this.getUserMedia = getUserMedia;
        this.RTCPeerConnection = PeerConnection; 
        this.enumerateDevices = enumerateDevices;
    }
    createPeerConnection(config){
        return new this.RTCPeerConnection(config); 
    }
}
export default new fakeRTC(()=>null, PeerConnection, enumerateDevices);