import VideoWrapper from '../VideoWrapper';
import HTMLMediaElement from './fake/HTMLMediaElement';
import MediaStream from './fake/MediaStream';
export default (expect :any, assert : any) => {
    describe('VideoWrapper tests', ()=>{
        it('cannot create a wrapper without an element', () => {
            expect(()=>new VideoWrapper(undefined)).to.throw("Video element not found" );
        });


        const mediaElement = new HTMLMediaElement();
        const wrapper = new VideoWrapper(mediaElement);
        it('can be created with a video', () => {
            expect(wrapper).to.not.be.undefined;
        });
        it('can be played', ()=>{
           wrapper.play();
           expect(mediaElement.paused).to.be.false;
        });
        it('can be paused', ()=>{
            wrapper.pause();
            expect(mediaElement.paused).to.be.true;
        });
        const firstStream = new MediaStream();
        it('the media source and mute can be set', () => {
            wrapper.setStream(firstStream, true);
            expect(mediaElement.srcObject).to.equal(firstStream);
            expect(mediaElement.muted).to.be.true;
        });
        const secondStream = new MediaStream();
        it('the media source and mute can updated', () => {
            wrapper.setStream(secondStream, false);
            expect(mediaElement.srcObject).to.equal(secondStream);
            expect(mediaElement.muted).to.be.false;
        });
        const thirdStream = new MediaStream();
        it('the media source can be set without mute', () => {
            wrapper.setStream(thirdStream);
            expect(mediaElement.srcObject).to.equal(thirdStream);
            expect(mediaElement.muted).to.be.false;
        });




    });
};