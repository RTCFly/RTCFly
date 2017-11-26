
export default class fakeRTC implements IRTC{
    public RTCPeerConnection : Function;
    getUserMedia(): any {
        return null;
    }
}