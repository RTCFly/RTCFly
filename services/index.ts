import { getUserMedia, RTCPeerConnection, enumerateDevices, onDeviceChange } from 'flyadapter';
import * as log from 'loglevel';



import { IPService } from './ip.service';
import { RTCService } from './rtc.service';
import { LoggerService } from './logger.service';
import { MessagingService } from './messaging.service';
import { MessageFactory } from './message.factory';
import { Events } from './events.service';

import { VideoWrapper } from '../entities/VideoWrapper';

const WebSocket = require('websocket');


export default () =>{
        
    const logger = new LoggerService({
        log
    });
    const events = new Events({
        logger
    });
    const rtc  = new RTCService({
        getUserMedia, 
        RTCPeerConnection, 
        enumerateDevices, 
        onDeviceChange,
        logger,
        events,
        VideoWrapper
    }); 
    const ip = new IPService({
        RTCPeerConnection
    });
    const messageFactory = new MessageFactory();
    const messagingService = new MessagingService({
        messageFactory,
        WebSocket
    });
    
    return {
        rtc,
        ip, 
        logger, 
        events, 
        messagingService
    } 
};