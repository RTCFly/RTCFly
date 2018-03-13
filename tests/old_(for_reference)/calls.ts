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

export default (expect :any, assert : any) => {
    describe('calls',() => {
        
        
        describe('getDevices returns list of devices', () => {
            
            (async function(){
                const client = new Client({}, rtc); 
                console.log(await client.getDevices());
            })();
          
        });
        
        const params = [{
            description: 'with no video elements',
            localElement: undefined,
            remoteElement: undefined,
            id: 'dave'
        }, {
            description: 'with only a local element',
            localElement: new HTMLMediaElement(),
            remoteElement: undefined,
            id: 'steve'
        }, {
            description: 'with only a remote element',
            localElement: undefined,
            remoteElement: new HTMLMediaElement(),
            id: 'ryan'
        }, {
            description: 'with both a local and remote element',
            localElement: new HTMLMediaElement(),
            remoteElement: new HTMLMediaElement(),
            id: 'john'
        }];
        describe('call a remote user using their _id', () => {

            for (let i = 0; i < params.length; i++) {
                const client = new Client({}, rtc);
                
                let param: any = params[i];
                 const spy = sinon.spy(window, 'fakeCallback');
                client.on('callInitialized', window.fakeCallback);
                client.call(param);
                describe("with " + param.description, () => {
                    it('should correctly initialise the local video', () => {
                        if (param.localElement) {
                            expect(client.getLocalVideo()).to.not.be.undefined;
                        } else {
                            const localVid = client.getLocalVideo();
                            expect(localVid).to.be.undefined;
                        }
                    })
                    it('should correctly initialise the remote video', () => {
                        if (param.remoteElement) {
                            expect(client.getRemoteVideo()).to.not.be.undefined;
                        } else {
                            expect(client.getRemoteVideo()).to.be.undefined;
                        }
                    });
                });
                it('should correctly invoke the handler call method', () => {
                    sinon.assert.calledWith(spy, param);
                });
                (window.fakeCallback as any).restore();
            }

        });

        describe('answering a call', () => {
            for (let i = 0; i < params.length; i++) {
                const client = new Client({}, rtc);
                let param: any = params[i];
                const spy = sinon.spy(window, 'fakeCallback');
                client.on("answerCall", window.fakeCallback);
                client.answerCall(param);
                describe("with " + param.description, () => {
                    it('should correctly initialise the local video', () => {
                        if (param.localElement) {
                            expect(client.getLocalVideo()).to.not.be.undefined;
                        } else {
                            const localVid = client.getLocalVideo();
                            expect(localVid).to.be.undefined;
                        }
                    })
                    it('should correctly initialise the remote video', () => {
                        if (param.remoteElement) {
                            expect(client.getRemoteVideo()).to.not.be.undefined;
                        } else {
                            expect(client.getRemoteVideo()).to.be.undefined;
                        }
                    });
                });
                it('should correctly invoke the handler call method', () => {
               //    sinon.assert.calledWith(spy, client.onError);
                });
                (window.fakeCallback as any).restore();

            }
        });

        describe('ending a call', ()=>{
            const client = new Client({}, rtc);
            const endCallSpy = sinon.spy(window, 'fakeCallback');
            client.on("endCall",window.fakeCallback);
            client.endCall();
            it('it should call the handler.endCall callback', () => {
              sinon.assert.calledOnce(endCallSpy);
            });
            (window.fakeCallback as any).restore();
        });
    });
};