import { IEventEmitter } from '@rtcfly/interfaces';
export class EventEmitter implements IEventEmitter {
    private _events :any ={};
    on(action:string, callback:Function):void{
        this._events[action] = callback;
    }
    
    emit(action:string, data?:any): void{
        if(this._events[action] !== undefined){
            this._events[action](data);
        }
    }
}