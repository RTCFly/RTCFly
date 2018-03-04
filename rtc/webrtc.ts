import { injectable, inject } from "inversify";
import { IRTCConfiguration,
         IRTCService,
         IMediaWrapper,
         ICallParams,
         IFlyAdapter,
         IMediaDevice } from '@rtcfly/interfaces';
import { TYPES } from '@rtcfly/types';
import { EventEmitter } from '@rtcfly/entities/eventemitter';
@injectable()
export default class WebRTC extends EventEmitter implements IRTCService {
    
    @inject(TYPES.MediaWrapper) private _mediaWrapper: IMediaWrapper;
    @inject(TYPES.FlyAdapter) private _flyAdapter:IFlyAdapter;
    private _config:IRTCConfiguration;
    
    private _peerConnection:any;
    
    init(config: IRTCConfiguration){
        this._config = config;
    }
    initSession(params:ICallParams){ 
        this._mediaWrapper.setVideoElements({
            localElement:params.localElement,
            remoteElement:params.remoteElement
        });
        if(params.audio || params.video){
            this._flyAdapter.getUserMedia({
                audio:params.audio || false, 
                video:params.video || false
            }).then((localStream => 
                this._videoWrapper.setVideoStream({
                    localStream
                }));
        } else {
            
        }
    }
    private initPeerConnection(params:ICallParams, stream?:IMediaStream){
        this._peerConnection = new this._FlyAdapter.RTCPeerConnection(this._config);
        this._registerPeerConnectionCallbacks();
    }
    private registerPeerConnectionCallbacks(params:ICallParams){
        this._peerConnection.onicecandidate = event => 
            event.candidate ? super.emit('iceCandidate', event.candidate): "";
            
        this._peerConnection.onaddstream = remoteStream => 
            this._mediaWrapper.setVideoStream({
                remoteStream
            });
            
    
        
    }
    getDevices():Promise<Array<IMediaDevice>>{
        return this._flyAdapter.enumerateDevices().then((devices:any) =>{
            
        });
    }
    getMedia():IMediaWrapper{
        return this._mediaWrapper;
    }
    on(action:string, callback:Function){
        super.on(action, callback);
    }
    
}