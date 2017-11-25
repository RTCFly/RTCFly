const CortRTC = require('./dist');
const RTCFactory = require('./RTCFactory').default;
const Handler = require('./handler').default;
console.log("dave", CortRTC);

//All hail JS Hoisting
const handlerOne = new Handler(document, "user1");
const handlerTwo = new Handler(document, "user2");



const coreOne = new CortRTC.client(handlerOne, {
    RTCPeerConnection: window.RTCPeerConnection,
    RTCIceCandidate: window.RTCIceCandidate,
    RTCSessionDescription: window.RTCSessionDescription
}, new RTCFactory());

const coreTwo = new CortRTC.client(handlerTwo, {
    RTCPeerConnection: window.RTCPeerConnection,
    RTCIceCandidate: window.RTCIceCandidate,
    RTCSessionDescription: window.RTCSessionDescription
}, new RTCFactory());


handlerOne.setOtherUserReference(coreTwo);
handlerTwo.setOtherUserReference(coreOne);

handlerOne.setOtherUserHandler(handlerTwo);
handlerTwo.setOtherUserHandler(handlerOne);
handlerOne.setCore(coreOne);
handlerTwo.setCore(coreTwo);

const user1Local = document.getElementById("user1-local");
const user1Remote = document.getElementById("user1-remote");


const user2Local = document.getElementById("user2-local");
const user2Remote = document.getElementById("user2-remote");


document.getElementById('call-user2').addEventListener('click', function() {
    coreOne.call("this doesn't matter", user1Local, user1Remote);
});

document.getElementById('call-user1').addEventListener('click', function() {
    coreTwo.call("this doesn't matter");
});
