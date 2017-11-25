import {IMediaStream} from "./IMediaStream";
export interface IPeerConnection {
    setLocalDescription(sessionDescription: Object): Promise;
    setRemoteDescription(sessionDescription: Object): Promise;
    addIceCandidate(rtcIceCandidate: Object): Promise;
    addStream(stream: IMediaStream): void;
    createOffer() : Promise;
    createAnswer(): Promise;
    onicecandidate() : void;
    oniceconnectionstatechange() : void;
    onaddstream(stream: IMediaStream) : void;
}