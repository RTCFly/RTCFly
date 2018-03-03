import { Container } from "inversify";
import { TYPES } from "@rtcfly/types";
import { IUserAgent, 
         IMessenger, 
         IWebClient, 
         IIPService, 
         IRTCService, 
         IErrorService,
         IWindowWebSocket } from "@rtcfly/interfaces";
import { GenericMessenger } from '@rtcfly/messenger';
import { UserAgent } from '@rtcfly/core';
import { WebRTC } from '@rtcfly/rtc';
import { LocalClient } from '@rtcfly/webclient';
import { ErrorService } from '@rtcfly/error';


const localContainer = new Container();
localContainer.bind<IMessenger>(TYPES.Messenger).to(GenericMessenger);
localContainer.bind<IUserAgent>(TYPES.UserAgent).to(UserAgent);
localContainer.bind<IRTCService>(TYPES.RTCService).to(WebRTC);
localContainer.bind<IWebClient>(TYPES.WebClient).to(LocalClient);
localContainer.bind<IErrorService>(TYPES.ErrorService).to(ErrorService);


export { localContainer };