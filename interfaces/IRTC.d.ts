declare interface IRTC {
    peerConnection:IPeerConnection;

    createPeerConnection(config);
    RTCPeerConnection:any; 
    startCall(params:ICallParams);
    reset();
    handleSenderStream(message:any);
    handleTargetAccept(message?:any);
    createSession();
    getLocalVideo(): IVideoWrapper;
    getRemoteVideo(): IVideoWrapper;
}