class RTC implements IRTC{
    public getUserMedia;
    public RTCPeerConnection;
    public enumerateDevices;
    public onDeviceChange; 
    constructor({
        getUserMedia, 
        RTCPeerConnection, 
        enumerateDevices,
        onDeviceChange
    }){
        this.getUserMedia = getUserMedia; 
        this.RTCPeerConnection = RTCPeerConnection;
        this.enumerateDevices = enumerateDevices;
        this.onDeviceChange = onDeviceChange;
    }
    createPeerConnection(config){
        return new this.RTCPeerConnection(config);
    }
}

export {
    RTCService
};