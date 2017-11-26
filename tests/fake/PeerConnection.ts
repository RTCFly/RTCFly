
export default class PeerConnection implements IPeerConnection{

    constructor(peerConnetion:any){

    }
    addStream(stream: IMediaStream): void {
    }
    setLocalDescription(sessionDescription: Object): Promise<any> {
        return new Promise<any>(function(){});
    }
    setRemoteDescription(sessionDescription: Object): Promise<any> {
        return new Promise<any>(function(){});
    }

    addIceCandidate(rtcIceCandidate: Object): Promise<any> {
        return new Promise<any>(function(){});
    }

    createOffer(): Promise<any> {
        return new Promise<any>(function(){});
    }

    createAnswer(): Promise<any> {
        return new Promise<any>(function(){});
    }

    onicecandidate(): void {
    }

    oniceconnectionstatechange(): void {
    }

    onaddstream(stream: IMediaStream): void {
    }

}