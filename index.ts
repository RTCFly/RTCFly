
import Client from './client';
import Server from './server';
import {MessageType, Message, MessageDirection} from './entities/Message';

interface IRTCMethods{
    RTCPeerConnection();
    RTCSessionDescription();
    RTCIceCandidate();
    getUserMedia();
}
class RTC implements IRTC  {

    public RTCSessionDescription;
    public RTCIceCandidate;
    public RTCPeerConnection;
    public getUserMedia;

    constructor(methods : IRTCMethods){
        this.RTCPeerConnection = methods.RTCPeerConnection ;
        this.RTCSessionDescription = methods.RTCSessionDescription;
        this.RTCIceCandidate = methods.RTCIceCandidate;
        this.getUserMedia = methods.getUserMedia;
    }

}

const client = (handler, RTCMethods, RTCFactory) => new Client(handler, new RTC(RTCMethods), RTCFactory);
//const server = (handler) => Server(handler);
export {
    client,
  //  server,
    Message,
    MessageDirection,
    MessageType
};

