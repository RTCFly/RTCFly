import { getUserMedia, RTCPeerConnection, enumerateDevices, onDeviceChange } from 'flyadapter';
import * as log from 'loglevel';



import { IPService } from './ip.service';
import { RTCService } from './rtc.service';
import { LoggerService } from './logger.service';
import { MessagingService } from './messaging.service';
import { MessageFactory } from './message.factory';
import { Events } from './events.service';


export default () =>{
        
    const logger = new LoggerService({
        log
    });
    const events = new Events({
        logger
    });
    const rtc  = new RTC({
        getUserMedia, 
        RTCPeerConnection, 
        enumerateDevices, 
        onDeviceChange,
        logger
    }); 
    const ip = new IPService({
        rtc
    });
    const messageFactory = new MessageFactory();
    const messagingService = new MessagingService({
        messageFactory
    });
    return {
        rtc,
        ip, 
        logger, 
        events, 
        messagingService
    } 
};