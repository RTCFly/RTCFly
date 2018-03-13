class IPService {
    private _RTCPeerConnection: any;
    constructor({
        RTCPeerConnection
    }){
        this._RTCPeerConnection = RTCPeerConnection; 
    }
    obtainIP(onNewIP:Function) : void{
            const pc = new this._RTCPeerConnection({
                iceServers: []
            });
            const localIPs = {};
            const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
            let key;
        
            function iterateIP(ip) {
                if (!localIPs[ip]) onNewIP(ip);
                localIPs[ip] = true;
            }
        
             //create a bogus data channel
            pc.createDataChannel("");
        
            // create offer and set local description
            pc.createOffer().then(function(sdp) {
                sdp.sdp.split('\n').forEach(function(line) {
                    if (line.indexOf('candidate') < 0) return;
                    line.match(ipRegex).forEach(iterateIP);
                });
        
                pc.setLocalDescription(sdp);
            }).catch(function(reason) {
                // An error occurred, so handle the failure to connect
            });
        
            //listen for candidate events
            pc.onicecandidate = function(ice) {
                if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
                ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
            };
        }
    
}

export {
    IPService
};