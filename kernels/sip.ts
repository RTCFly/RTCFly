import { Container } from "inversify";
import { TYPES } from "@rtcfly/types";
import { IUserAgent, 
         IMessageHandler, 
         IWebClient, 
         IIPService, 
         IRTCService, 
         IErrorService,
         IWindowWebSocket } from "@rtcfly/interfaces";
import { SipMessenger } from '@rtcfly/messenger';
import { UserAgent } from '@rtcfly/core';
import { WebRTC } from '@rtcfly/rtc';
import { WebSockets } from '@rtcfly/webclient';
import { ErrorService } from '@rtcfly/error';


const sipContainer = new Container();
sipContainer.bind<IMessageHandler>(TYPES.Messenger).to(SipMessenger);
sipContainer.bind<IUserAgent>(TYPES.UserAgent).to(UserAgent);
sipContainer.bind<IRTCService>(TYPES.RTCService).to(WebRTC);
sipContainer.bind<IWebClient>(TYPES.WebClient).to(WebSockets);
sipContainer.bind<IErrorService>(TYPES.ErrorService).to(ErrorService);


export { sipContainer };