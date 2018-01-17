const CortRTC = require('./dist');



const coreOne = new CortRTC.client();
coreOne.on('callInitialized', () => {});

const coreTwo = new CortRTC.client();

const user1Local = document.getElementById("user1-local");
const user1Remote = document.getElementById("user1-remote");


const user2Local = document.getElementById("user2-local");
const user2Remote = document.getElementById("user2-remote");


document.getElementById('call-user2').addEventListener('click', () =>
    coreOne.call({
        id: "targetID", //Unique identifier for the target user
        localElement: user1Local, //the video element for the caller
        remoteElement: user1Remote, //the video element for the callee
        audio: true, //request audio stream
        video: true //request video stream
    })
);

document.getElementById('call-user1').addEventListener('click', function() {
    coreTwo.call("this doesn't matter", user2Local, user2Remote);
});

document.getElementById('answer-user1').addEventListener('click', function() {
    coreOne.answerPhoneCall(user1Local, user1Remote);
});
document.getElementById('answer-user2').addEventListener('click', function() {
    coreTwo.answerPhoneCall(user2Local, user2Remote);
});
document.getElementById('reject-user1').addEventListener('click', function() {
    coreOne.answerPhoneCall(user1Local, user1Remote);
});
document.getElementById('reject-user2').addEventListener('click', function() {
    coreTwo.answerPhoneCall(user2Local, user2Remote);
});
