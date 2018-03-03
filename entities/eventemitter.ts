class EventEmitter {
    private _events :any ={};
    public on(action:string, callback:Function):void{
        this._events[action] = callback;
    }
    
    private emit(action:string, data:any): void{
        if(this._events[action] !== undefined){
            this._events[action](data);
        }
    }
}