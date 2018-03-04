import {sipContainer, genericContainer} from './kernels';
import {TYPES} from '@rtcfly/types';
import {IUserAgent, IMessageHandler} from '@rtcfly/interfaces';
const rtcFlyFactory = (type:string, messengerImplementation?:any): IUserAgent =>{
        switch(type.toLowerCase()){
            case "sip":
                return sipContainer.get<IUserAgent>(TYPES.UserAgent);
            case "generic":
                if(messengerImplementation !== undefined){
                    genericContainer.bind<IMessageHandler>(TYPES.Messenger).to(messengerImplementation);
                    return genericContainer.get<IUserAgent>(TYPES.UserAgent);
                } else {
                    throw new Error("Messenger implemntation not provided");
                }
                 
        }
    }; 
export {
    rtcFlyFactory
}