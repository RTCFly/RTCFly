declare interface IRTC {
    getUserMedia(mediaConstrains:any);
    RTCPeerConnection:any; 
    createPeerConnection(config); 
    enumerateDevices(); 
    onDeviceChange(callback);
}