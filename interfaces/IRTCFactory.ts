import {IPeerConnection} from "./IPeerConnection";
export interface IRTCFactory{
    createPeerConnection(RTCConfig: Object):IPeerConnection;
}