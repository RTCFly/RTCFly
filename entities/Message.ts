export enum MessageDirection {
    Sender,
    Target
}
export enum MessageType {
    Candidate,
    SessionDescription,

}
export class Message {
    public Direction: MessageDirection;
    public Type: MessageType;
    public data: Object;
}


