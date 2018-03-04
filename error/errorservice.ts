import { IErrorService } from '@rtcfly/interfaces';
export class ErrorService implements IErrorService {
    missingConfig(){
        throw new Error("Config object not found. Please provide a config");
    }
    invalidConfig(missingField:string){
        throw new Error(`Config missing field ${missingField}`);
    }
    invalidCallTarget(callTarget:string){
        throw new Error(`Invalid call target ${callTarget}`);
    }
}