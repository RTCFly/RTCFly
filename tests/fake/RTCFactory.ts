import PeerConnection from './PeerConnection';
export default class RTCFactory implements IRTCFactory{
    createPeerConnection(configuration: Array<Object>) : IPeerConnection{
        return new  PeerConnection(configuration);
    }
}