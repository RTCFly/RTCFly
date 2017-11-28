Feature: Responding to a phone call


  Background:
    Given I am receiving a phone call
    Then the call "user2" button is clicked
    And "user2" should receive a call

  Scenario: Answering a phone call
    Given a user is receiving a phone call
    When the user accepts the call
    Then the users are connected

  Scenario: Rejecting a phone call
    Given a user is receiving a phone call
    When the user rejects the call
    Then the caller is informed of "Call rejection"
