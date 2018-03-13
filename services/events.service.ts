
class Events implements IEvents {
    public eventMap: any; 
    
    private _logger:any;
    constructor({
        logger
    }){
        this.eventMap = {};
        this._logger = logger;
    }
    public callEvent(event){
        this._logger.log("calling event", event);
        if(this.eventMap[event]){
            return this.eventMap[event];
        } else {
            return function(){}
        }
    }
    public setEvent(eventName:string, action:Function){
        this.eventMap[eventName] = action;
    }
    
}

export { 
  Events  
};