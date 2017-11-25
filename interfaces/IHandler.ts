export interface IHandler {
    call(_id: string, callback: Function) : void;
    endPhoneCall(onError: Function) : void;
    answerPhoneCall(onError: Function) : void;

    emitSenderDescription(sessionDescription: Object) : void;
    emitIceCandidate(iceCandidate: Object): void;
    emitTargetAnswer(sessionDescription: Object): void;

    onPeerConnectionCreated(): void;
    onCallInitialised(err: Error) : void;

    onReceivePhoneCall(fields: any) : void;
    onTargetAccept(fields: any) : void;
    onPeerConnectionCreated() : void;
}