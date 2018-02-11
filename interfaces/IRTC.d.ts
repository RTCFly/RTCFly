declare interface IRTC {
    peerConnection:IPeerConnection;
    getUserMedia(mediaConstrains:any);
    RTCPeerConnection:any; 
    createPeerConnection(config); 
    enumerateDevices(); 
    onDeviceChange(callback);
    startCall(params:ICallParams);
    reset();
    handleSenderStream(message:any);
    handleTargetAccept(message?:any);
    createSession();
    getLocalVideo(): IVideoWrapper;
    getRemoteVideo(): IVideoWrapper;
}