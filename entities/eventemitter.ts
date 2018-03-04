class EventEmitter {
    private _events :any ={};
    protected on(action:string, callback:Function):void{
        this._events[action] = callback;
    }
    
    protected emit(action:string, data?:any): void{
        if(this._events[action] !== undefined){
            this._events[action](data);
        }
    }
}