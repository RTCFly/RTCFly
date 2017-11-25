import {IMediaStream} from "./IMediaStream";
export interface IHTMLMediaElement{
     play() : void;
     pause() : void;
     paused: boolean;
     muted: boolean;
     srcObject: IMediaStream;
}