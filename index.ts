import { getUserMedia, RTCPeerConnection, enumerateDevices, onDeviceChange } from 'flyadapter';


import Client from './client';
import Server from './server';
import {MessageType, Message, MessageDirection} from './entities/Message';

class RTC implements IRTC{
    public getUserMedia;
    public RTCPeerConnection;
    public enumerateDevices;
    public onDeviceChange; 
    constructor(getUserMedia, RTCPeerConnection, enumerateDevices,onDeviceChange){
        this.getUserMedia = getUserMedia; 
        this.RTCPeerConnection = RTCPeerConnection;
        this.enumerateDevices = enumerateDevices;
        this.onDeviceChange = onDeviceChange;
    }
    createPeerConnection(config){
        return new this.RTCPeerConnection(config);
    }
}

const client = (settings) => new Client(settings, new RTC(getUserMedia, RTCPeerConnection, enumerateDevices));
//const server = (handler) => Server(handler);
export {
    client,
  //  server,
    Message,
    MessageDirection,
    MessageType
};

