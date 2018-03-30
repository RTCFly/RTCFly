import { Container } from "inversify";
import { TYPES } from "@rtcfly/types";
import { IUserAgent, 
         IIPService, 
         IRTCService, 
         IErrorService } from "@rtcfly/interfaces";
import { UserAgent } from '@rtcfly/core';
import { WebRTC } from '@rtcfly/rtc';
import { ErrorService } from '@rtcfly/error';
import { FlyAdapterClass } from 'flyadapter';


const genericContainer = new Container();
genericContainer.bind<IUserAgent>(TYPES.UserAgent).to(UserAgent);
genericContainer.bind<IRTCService>(TYPES.RTCService).to(WebRTC);
genericContainer.bind<IErrorService>(TYPES.ErrorService).to(ErrorService);
genericContainer.bind<IFlyAdapter>(TYPES.FlyAdapter).to(FlyAdapterClass);


export { genericContainer };