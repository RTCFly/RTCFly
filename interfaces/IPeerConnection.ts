import {IMediaStream} from "./IMediaStream";
export interface IPeerConnection {
    setLocalDescription(sessionDescription: Object): Promise<any>;
    setRemoteDescription(sessionDescription: Object): Promise<any>;
    addIceCandidate(rtcIceCandidate: Object): Promise<any>;
    addStream(stream: IMediaStream): void;
    createOffer() : Promise<any>;
    createAnswer(): Promise<any>;
    onicecandidate() : void;
    oniceconnectionstatechange() : void;
    onaddstream(stream: IMediaStream) : void;
}