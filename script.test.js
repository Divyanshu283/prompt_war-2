/**
 * @jest-environment jsdom
 */

const { electionSteps, qaDatabase, handleQuestion } = require('./script');

describe('Election Assistant Data and Logic Tests', () => {
  beforeEach(() => {
    // Setup minimal DOM for tests
    document.body.innerHTML = `
      <div id="timeline-items"></div>
      <div id="step-modal" class="modal">
          <span class="close-btn"></span>
      </div>
      <div id="chat-area"></div>
      <div id="question-chips"></div>
    `;
  });

  describe('electionSteps Data Structure', () => {
    test('electionSteps array has correct properties', () => {
      expect(electionSteps).toBeDefined();
      expect(electionSteps.length).toBeGreaterThan(0);
      
      electionSteps.forEach(step => {
        expect(step).toHaveProperty('id');
        expect(step).toHaveProperty('title');
        expect(step).toHaveProperty('icon');
        expect(step).toHaveProperty('shortDesc');
        expect(step).toHaveProperty('longDesc');
        expect(step).toHaveProperty('facts');
        expect(Array.isArray(step.facts)).toBeTruthy();
      });
    });

    test('first step is Voter Registration', () => {
      expect(electionSteps[0].id).toBe('registration');
      expect(electionSteps[0].title).toBe('Voter Registration');
    });
  });

  describe('qaDatabase Data Structure', () => {
    test('qaDatabase array has correct properties', () => {
      expect(qaDatabase).toBeDefined();
      expect(qaDatabase.length).toBeGreaterThan(0);
      
      qaDatabase.forEach(qa => {
        expect(qa).toHaveProperty('keywords');
        expect(Array.isArray(qa.keywords)).toBeTruthy();
        expect(qa).toHaveProperty('question');
        expect(qa).toHaveProperty('answer');
      });
    });
  });

  describe('Assistant Logic', () => {
    test('handleQuestion adds user and assistant messages to DOM', () => {
      // Mock setTimeout to execute immediately
      jest.useFakeTimers();
      
      handleQuestion('Who is eligible to vote?', 'Generally, you must be a citizen...');
      
      const chatArea = document.getElementById('chat-area');
      
      // Initially, only the user message is appended
      const messages = chatArea.querySelectorAll('.message');
      expect(messages.length).toBe(1);
      expect(messages[0].classList.contains('user-message')).toBeTruthy();
      expect(messages[0].textContent).toBe('Who is eligible to vote?');
      
      // Fast-forward timers for assistant response
      jest.runAllTimers();
      
      const messagesAfterTimeout = chatArea.querySelectorAll('.message');
      expect(messagesAfterTimeout.length).toBe(2);
      expect(messagesAfterTimeout[1].classList.contains('assistant-message')).toBeTruthy();
      expect(messagesAfterTimeout[1].innerHTML).toBe('Generally, you must be a citizen...');
      
      jest.useRealTimers();
    });
  });
});
