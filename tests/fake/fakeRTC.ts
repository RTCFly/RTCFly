import {IRTC} from '../../interfaces/IRTC';
import {IMediaStream} from '../../interfaces/IMediaStream';
export default class fakeRTC implements IRTC{
    public RTCPeerConnection : Function;
    getUserMedia(): any {
        return null;
    }
}