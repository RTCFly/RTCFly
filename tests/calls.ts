import rtc from './fake/fakeRTC';
import HTMLMediaElement from './fake/HTMLMediaElement';

import Client from '../client';

import * as sinon from 'sinon';

// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
const window = {
    fakeCallback:function(){
    }
};
const handler = {
    onCallInitialised(){}, 
    call(){},
    answerPhoneCall(){},
    endPhoneCall(){}
};
export default (expect :any, assert : any) => {
    describe('calls',() => {
        const params = [{
            description: 'with no video elements',
            local: undefined,
            remote: undefined,
            _id: 'dave'
        }, {
            description: 'with only a local element',
            local: new HTMLMediaElement(),
            remote: undefined,
            _id: 'steve'
        }, {
            description: 'with only a remote element',
            local: undefined,
            remote: new HTMLMediaElement(),
            _id: 'ryan'
        }, {
            description: 'with both a local and remote element',
            local: new HTMLMediaElement(),
            remote: new HTMLMediaElement(),
            _id: 'john'
        }];
        describe('call a remote user using their _id', () => {

            for (let i = 0; i < params.length; i++) {
                const client = new Client({}, rtc);
                
                let param: any = params[i];
                 const spy = sinon.spy(window, 'fakeCallback');
                client.on('callInitialized', window.fakeCallback);
                client.call(param._id, param.local, param.remote);
                describe("with " + param.description, () => {
                    it('should correctly initialise the local video', () => {
                        if (param.local) {
                            expect(client.getLocalVideo()).to.not.be.undefined;
                        } else {
                            const localVid = client.getLocalVideo();
                            expect(localVid).to.be.undefined;
                        }
                    })
                    it('should correctly initialise the remote video', () => {
                        if (param.remote) {
                            expect(client.getRemoteVideo()).to.not.be.undefined;
                        } else {
                            expect(client.getRemoteVideo()).to.be.undefined;
                        }
                    });
                });
                it('should correctly invoke the handler call method', () => {
                    sinon.assert.calledWith(spy, param._id);
                });
                (window.fakeCallback as any).restore();
            }

        });

        describe('answering a phone call', () => {
            for (let i = 0; i < params.length; i++) {
                const client = new Client(handler, rtc);
                let param: any = params[i];
                const spy = sinon.spy(handler, 'answerPhoneCall');
                client.answerPhoneCall(param.local, param.remote);
                describe("with " + param.description, () => {
                    it('should correctly initialise the local video', () => {
                        if (param.local) {
                            expect(client.getLocalVideo()).to.not.be.undefined;
                        } else {
                            const localVid = client.getLocalVideo();
                            expect(localVid).to.be.undefined;
                        }
                    })
                    it('should correctly initialise the remote video', () => {
                        if (param.remote) {
                            expect(client.getRemoteVideo()).to.not.be.undefined;
                        } else {
                            expect(client.getRemoteVideo()).to.be.undefined;
                        }
                    });
                });
                it('should correctly invoke the handler call method', () => {
               //    sinon.assert.calledWith(spy, client.onError);
                });
                (handler.answerPhoneCall as any).restore();

            }
        });

        describe('ending a phone call', ()=>{
            const client = new Client(handler, rtc);
            const endPhoneCallSpy = sinon.spy(handler, 'endPhoneCall');
            client.endPhoneCall();
            it('it should call the handler.endPhoneCall callback', () => {
              //  sinon.assert.calledWith(endPhoneCallSpy, client.onError);
            });
            (handler.endPhoneCall as any).restore();
        });
    });
};