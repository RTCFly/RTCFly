declare interface IEvents {
     eventMap:any; 
     callEvent(event:string);
     setEvent(eventName:string, action:Function);
}