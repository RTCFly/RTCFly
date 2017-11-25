import PeerConnection from './PeerConnection';
import {IPeerConnection} from "../../interfaces/IPeerConnection";
import {IRTCFactory} from "../../interfaces/IRTCFactory";
export default class RTCFactory implements IRTCFactory{
    createPeerConnection(configuration: Array<Object>) : IPeerConnection{
        return new  PeerConnection(configuration);
    }
}