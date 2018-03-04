import { injectable, inject } from 'inversify';
import { TYPES } from '@rtcfly/types';
import { IWebClient,
         IWindowWebSocket } from '@rtcfly/interfaces';
@injectable()
export class WebSocketsClient implements IWebClient {
    
    private _connection:any;
    connect(server:string){}
    
    recieveMessage(){
        
    }
    
    sendMessage(){
        
    }
    
}