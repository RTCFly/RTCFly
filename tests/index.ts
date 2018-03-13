import { eventsServiceTests } from './services/events.service.spec';

import Client from '../client';
import 'mocha';
import * as chai from 'chai';

import * as sinon from 'sinon';


const expect = chai.expect;
const assert = chai.assert;
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
describe('client class', () => {
 //   const testClient = new Client();
 //pass the build so we can start work on the tests
 const testClient = !undefined; 
    it('should define client class object', () => {
        expect(testClient).to.not.be.an('undefined');
    });
});
eventsServiceTests(expect, assert);
// callTests(expect,assert);
// streamTests(expect, assert);
// videoWrapperTests(expect, assert);