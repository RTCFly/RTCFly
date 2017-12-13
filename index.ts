import { getUserMedia, RTCPeerConnection } from 'flyadapter';


import Client from './client';
import Server from './server';
import {MessageType, Message, MessageDirection} from './entities/Message';

class RTC implements IRTC{
    public getUserMedia;
    public RTCPeerConnection;
    constructor(getUserMedia, RTCPeerConnection){
        this.getUserMedia = getUserMedia; 
        this.RTCPeerConnection = RTCPeerConnection;
    }
    createPeerConnection(config){
        return new this.RTCPeerConnection(config);
    }
}

const client = (handler) => new Client(handler, new RTC(getUserMedia, RTCPeerConnection));
//const server = (handler) => Server(handler);
export {
    client,
  //  server,
    Message,
    MessageDirection,
    MessageType
};

