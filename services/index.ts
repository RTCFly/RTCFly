import { getUserMedia, RTCPeerConnection, enumerateDevices, onDeviceChange } from 'flyadapter';
import * as log from 'loglevel';



import { IPService } from './ip.service';
import { RTCService } from './rtc.service';
import { LoggerService } from './logger.service';
import { MessagingService } from './messaging.service';
import { MessageFactory } from './message.factory';

const rtc  = new RTC({
    getUserMedia, 
    RTCPeerConnection, 
    enumerateDevices, 
    onDeviceChange
}); 
const ip = new IPService({
    rtc
});
const logger = new LoggerService({
    log
});
const messageFactory = new MessageFactory();
const messagingService = new MessagingService({
    messageFactory
});
export {
    rtc,
    ip, 
    logger
};