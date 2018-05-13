import { injectable, inject } from "inversify";
import { IRTCConfiguration,
         IRTCService,
         IMediaWrapper,
         ICallParams,
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
    /**
     * Initialise the local call session  
     * 
     */
    public initSession(params:ICallParams):Promise<string>{ 
        return new Promise((resolve, reject) => {
            
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
                    })).then(()=>{
                        this.initPeerConnection(params, resolve, localStream);
                    }));
            } else {
                this.initPeerConnection(params, resolve)
            }
        });
        
    }
    private initPeerConnection(params:ICallParams, resolve:Promise<string>, stream?:IMediaStream){
        this._peerConnection = new this._FlyAdapter.RTCPeerConnection(this._config);
        if(stream){
            this._peerConnection.addStream(stream);
        }
        this._registerPeerConnectionCallbacks();
        this._setupLocalSession(params, resolve);
    }
    private registerPeerConnectionCallbacks(params:ICallParams){
        this._peerConnection.onicecandidate = event => 
            event.candidate ? super.emit('iceCandidate', event.candidate): "";
            
        this._peerConnection.onaddstream = remoteStream => 
            this._mediaWrapper.setVideoStream({
                remoteStream
            });
    }
    
    private _setupLocalSession(params:ICallParams, resolve:Promise<string>){
        if(params.caller){
            this._peerConnection.createOffer().then(offer =>{
                this._peerConnection.setLocalDescription(offer);
                resolve(offer);
            });
        }
    }
    
    public getDevices():Promise<Array<IMediaDevice>>{
        return this._flyAdapter.enumerateDevices().then((devices:any) =>{
            //convert to IMediaDevice
        });
    }
    getMedia():IMediaWrapper{
        return this._mediaWrapper;
    }
    on(action:string, callback:Function){
        super.on(action, callback);
    }
    emit(action:string, data:any){
        super.on(action, data);
    }
    
}