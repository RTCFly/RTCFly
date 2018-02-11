class LoggerService {
    
    private _log : any; 
    
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
    public error(params) : void {
        this._log.error(...params);
    }
    
}
export {
    LoggerService
};