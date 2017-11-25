import {IHandler} from  '../../interfaces/IHandler';

export default class FakeHandler implements IHandler {
    onReceivePhoneCall(fields: any): void {
    }

    onTargetAccept(fields: any): void {
    }


    endPhoneCall(onError: Function): void {
    }

    answerPhoneCall(onError: Function): void {
    }

    emitSenderDescription(sessionDescription: Object) {
    }

    emitIceCandidate(iceCandidate: Object): void {
    }

    emitTargetAnswer(sessionDescription: Object): void {
    }

    onPeerConnectionCreated(): void {
    }

    onCallInitialised(err: Error): void {
    }
    call(_id: string, callback: Function): void {
    }

}