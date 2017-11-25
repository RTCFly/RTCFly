import FakeHandler from './tests/fake/fakehandler';
import FakeRTC from './tests/fake/fakeRTC';
import HTMLMediaElement from './tests/fake/HTMLMediaElement';
import FakeRTCFactory from './tests/fake/RTCFactory';

import Client from './client';
import 'mocha';
import * as chai from 'chai';

import * as sinon from 'sinon';
import RTCFactory from "./tests/fake/RTCFactory";
import {Message, MessageDirection, MessageType} from "./entities/Message";
import PeerConnection from './tests/fake/PeerConnection';
import callTests from './tests/calls';
import streamTests from './tests/streams';
import videoWrapperTests from './tests/video_wrapper';

const expect = chai.expect;
const assert = chai.assert;
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
const handler = new FakeHandler();
const rtc = new FakeRTC();
const rtcFactory = new RTCFactory();
describe('client class', () => {
    const testClient = new Client(handler, rtc, rtcFactory);
    it('should define client class object', () => {
        expect(testClient).to.not.be.an('undefined');
    });
});
callTests(expect,assert);
streamTests(expect, assert);
videoWrapperTests(expect, assert);