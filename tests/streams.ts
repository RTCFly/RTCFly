import FakeHandler from './fake/fakehandler';
import FakeRTC from './fake/fakeRTC';
import HTMLMediaElement from './fake/HTMLMediaElement';
import PeerConnection from './fake/PeerConnection';
import Client from '../client';

import * as sinon from 'sinon';
import RTCFactory from "./fake/RTCFactory";
import {Message, MessageDirection, MessageType}from '../entities/Message';

// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
const handler = new FakeHandler();
const rtc = new FakeRTC();
const rtcFactory = new RTCFactory();

export default (expect :any, assert : any) => {
  describe("streams", ()=>{
      describe('the handleSenderStream method should call the correct handler', () => {

          const testSets = [
              {
                  description: "should only call addIceCandidate",
                  data: {
                      Direction: MessageDirection.Sender,
                      Type: MessageType.Candidate,
                      data: {dave: "dave"}
                  },
                  setRemoteDescription:false,
                  addIceCandidate:true
              }, {
                  description: "should only call setRemoteDescription",
                  data: {
                      Direction: MessageDirection.Sender,
                      Type: MessageType.SessionDescription,
                      data: {dave: "dave"}
                  },
              setRemoteDescription:true,
              addIceCandidate:false
              }
          ];
          for (let i = 0; i < testSets.length; i++) {
              const client = new Client(handler, rtc, rtcFactory);
              const peerConnectionStub = new PeerConnection([]);
              client.peerConnection = peerConnectionStub;
              it(testSets[i].description, () => {
                  //noinspection
                  const addIceCandidateSpy = sinon.spy(peerConnectionStub, 'addIceCandidate');
                  const setRemoteDescriptionSpy = sinon.spy(peerConnectionStub, 'setRemoteDescription');
                  client.handleSenderStream(testSets[i].data);
                  if(testSets[i].addIceCandidate)
                      sinon.assert.calledWith(addIceCandidateSpy, testSets[i].data.data);
                  else
                      sinon.assert.notCalled(addIceCandidateSpy);
                  if(testSets[i].setRemoteDescription)
                      sinon.assert.calledWith(setRemoteDescriptionSpy, testSets[i].data.data);
                  else
                      sinon.assert.notCalled(setRemoteDescriptionSpy);
                  (peerConnectionStub.setRemoteDescription as any).restore();
              });
          }
      });


      describe('the handleTargetStream method should call the correct methods', () => {
          describe('iceCandidate message',()=>{
              const client = new Client(handler, rtc, rtcFactory);
              const peerConnectionStub = new PeerConnection([]);
              client.peerConnection = peerConnectionStub;
              const message = {
                  Direction: MessageDirection.Sender,
                  Type: MessageType.Candidate,
                  data: {dave: "dave"}
              } as Message;
              const addIceCandidateSpy = sinon.spy(peerConnectionStub, 'addIceCandidate');
              client.handleTargetStream(message);
              it('should have called addIceCandidate',() => {
                sinon.assert.calledWith(addIceCandidateSpy, message.data);
              });
              (peerConnectionStub.addIceCandidate as any).restore();
          });
      });


  })
};