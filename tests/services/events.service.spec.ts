import { Events } from '../../services/events.service'; 

export const eventsServiceTests = (expect, assert) => {
    describe('events service tests', () => {
       it('can call an event handler', () => {
           const events = new Events({
              logger:{
                  log(){}
              } 
           });
           const newEventCallback = () => {};
           const incorrectEventCallback = () => {};
           
           events.setEvent('testEvent', newEventCallback);
           events.setEvent('secondTestEvent', incorrectEventCallback);

           expect(events.callEvent('testEvent')).equal(newEventCallback);
           expect(events.callEvent('secondTestEvent')).not.to.equal(newEventCallback);
       });
    });
};