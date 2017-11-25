var assert = require('cucumber-assert');


exports.Actionwords = {
    iAmAbleToCall: function () {
 console.log("ya dun kno")
    },
    user1IsAbleToCallUser2: function (user1, user2) {return;},
    theCallP1ButtonIsCkicked: function (driver, p1) {
        //wasne
    },
    p1ShouldRecieveACall: function (driver, p1) {
        //wasnae working for no good reason
    },
    p1ShouldReceiveACall: function (p1) {
 console.log("ya dun kno")
    },
    aUserIsReceivingAPhoneCall: function () {
 console.log("ya dun kno")
    },
    theUserAcceptsTheCall: function () {
 console.log("ya dun kno")
    },
    theUsersAreConnected: function () {
 console.log("ya dun kno")
    },
    theUserRejectsTheCall: function () {
 console.log("ya dun kno")
    },
    theCallerIsInformedOfP1: function (p1) {
 console.log("ya dun kno")
    }
};