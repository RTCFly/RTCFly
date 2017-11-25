Feature: CoreRTC V1
    As any user, 
    I want to call another user,
    So that they can share data and streams

  Scenario: Calling another user
    Given "user1" is able to call "user2"
    When the call "user2" button is ckicked
    Then "user2" should receive a call

  Scenario: Answering a phone call
    Given a user is receiving a phone call
    When the user accepts the call
    Then the users are connected

  Scenario: Rejecting a phone call
    Given a user is receiving a phone call
    When the user rejects the call
    Then the caller is informed of "Call rejection"
