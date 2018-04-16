declare interface IFlyAdapter {
    
  RTCPeerConnection(configuration:IRTCConfiguration) :IRTCPeerConnection;
  RTCDataChannel();
  RTCDataChannelEvent();
  RTCSessionDescription(); 
  RTCSessionDescriptionCallback();
  RTCStatsReport();
  RTCIceCandidate(); 
  RTCPeerConnectionIceEvent();
  RTCRtpSender(); 
  RTCRtpReceiver();
  RTCRtpContributingSource(); 
  RTCConfiguration();
  RTCSctpTransport();
  RTCIdentityAssertion();
  RTCIdentityEvent();
  RTCIdentityErrorEvent();
  RTCCertificate();
  getUserMedia(constraints:IMediaStreamConstraints): Promise<any>;
}

declare interface IMediaStreamConstraints {
  video:boolean|any;
  audio:boolean|any;
}

declare interface IRTCConfiguration {
  bundlePolicy:string; 
  certificates:Array<IRTCCertificate>;
  iceCandidatePoolSize:Number; 
  iceServers:Array<IRTCIceServer>;
  iceTransportPolicy:string;
  peerIdentity:string; 
  rtcpMuxPolicy:string;
}
declare interface IRTCIceServer {
  credential:string;
  credentialType:string;
  urls:string|Array<string>;
  username:string;
}

declare interface IRTCCertificate {
  expires:Date;
}

declare interface IRTCPeerConnection {
  connectionState:string; 
  currentLocalDescription:string;
  currentRemoteDescription:string; 
  defaultIceServers:Array<IRTCIceServer>;
  iceConnectionState:string; 
  iceGatheringState:string;
  localDescription:IRTCSessionDescription; 
  peerIdentity:IRTCIdentityAssertion;
  pendingLocalDescription:IRTCSessionDescription;
  pendingRemoteDescription:IRTCSessionDescription;
  remoteDescription:IRTCSessionDescription;
  sctp:IRTCSctpTransport;
  canTrickleIceCanidates:boolean; 
  signallingState:string;
  
  //implement methods
  
}
declare interface IRTCSctpTransport {
  maxMessageSize:Number;
  transport:any; 
}
declare interface IRTCSessionDescription {
  type:"answer"|"offer"|"pranswer"|"rollback";
  sdp:string;
}



declare interface IRTCIdentityAssertion {
  idp:string;
  name:string; 
}