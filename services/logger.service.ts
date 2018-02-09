class LoggerService {
    
    private _logger : any; 
    
    constructor({
        log
    }) {
        this._log = log; 
    }
    public disable() : void {
        this._log.setLevel("silent");
    }
    public enable() : void { 
        this._log.setLevel("trace");
    }
    public log(params) : void {
        this._log.debug(...params)
    }
    
}

export {
    LogService
};