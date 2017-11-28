Feature: RTCFly V1
    As any user, 
    I want to call another user,
    So that they can share data and streams

  Scenario: Calling another user
    Given "user1" is able to call "user2"
    When the call "user2" button is clicked
    Then "user2" should receive a call
