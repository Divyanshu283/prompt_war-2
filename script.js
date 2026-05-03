"use strict";

/**
 * @typedef {Object} ElectionStep
 * @property {string} id - Unique identifier for the step
 * @property {string} title - The title of the election step
 * @property {string} icon - FontAwesome icon class
 * @property {string} shortDesc - A brief description of the step
 * @property {string} longDesc - A detailed description shown in the modal
 * @property {string[]} facts - Key facts related to this step
 */

// Election Process Data
const electionSteps = [
    {
        id: 'registration',
        title: 'Voter Registration',
        icon: 'fa-id-card',
        shortDesc: 'Ensure you are eligible and registered to vote.',
        longDesc: 'Before you can cast a ballot, you must be registered to vote. This process verifies your identity, age, and citizenship to ensure election integrity. Deadlines vary by region, so it\'s crucial to check your local requirements early.',
        facts: [
            'Usually requires proof of identity and residence.',
            'Many places offer online registration now.',
            'You must update your registration if you move or change your name.'
        ]
    },
    {
        id: 'campaign',
        title: 'The Campaign',
        icon: 'fa-bullhorn',
        shortDesc: 'Candidates present their platforms and debate issues.',
        longDesc: 'During this phase, candidates and parties campaign to win the support of voters. They hold rallies, participate in debates, run advertisements, and publish manifestos outlining what they intend to do if elected.',
        facts: [
            'Campaigns are heavily regulated regarding financing and advertising.',
            'Debates are a key way for voters to compare candidates directly.',
            'This is the time to research platforms and decide who aligns with your values.'
        ]
    },
    {
        id: 'voting',
        title: 'Polling Day',
        icon: 'fa-box-archive',
        shortDesc: 'Voters cast their ballots at designated polling stations.',
        longDesc: 'This is the main event! Voters go to polling stations, verify their identity, and cast their ballot in secret. Many systems also allow for early voting or mail-in voting for convenience or accessibility.',
        facts: [
            'Your vote is always secret; no one can know who you voted for unless you tell them.',
            'Polling stations are usually open for 12-15 hours to accommodate workers.',
            'If you are in line when the polls close, you usually still have the right to vote.'
        ]
    },
    {
        id: 'counting',
        title: 'The Count',
        icon: 'fa-calculator',
        shortDesc: 'Ballots are securely collected and tallied.',
        longDesc: 'Once polls close, the counting begins. Depending on the system, this might involve electronic tallying, manual counting of paper ballots, or a mix of both. The process is strictly monitored by election officials and independent observers.',
        facts: [
            'Observers from different parties watch the count to ensure fairness.',
            'In close races, a recount may be automatically triggered or requested.',
            'Mail-in ballots often take longer to count because signatures must be verified.'
        ]
    },
    {
        id: 'results',
        title: 'Results & Transition',
        icon: 'fa-landmark',
        shortDesc: 'Winners are announced and prepare to take office.',
        longDesc: 'Official results are certified. The winning candidates prepare to take office during a transition period. The peaceful transfer of power is a hallmark of a stable democracy.',
        facts: [
            'Media outlets often "project" winners before results are official based on statistics.',
            'Official certification can take days or weeks after election day.',
            'Elected officials usually take an oath of office before beginning their duties.'
        ]
    }
];

// Assistant Q&A Data
const qaDatabase = [
    {
        keywords: ['who', 'can', 'vote', 'eligibility', 'age'],
        question: 'Who is eligible to vote?',
        answer: 'Generally, you must be a citizen of the country, meet the minimum age requirement (usually 18), and be registered to vote. Some regions have specific rules regarding residency or past criminal convictions.'
    },
    {
        keywords: ['where', 'how', 'polling', 'station', 'location'],
        question: 'How do I find where to vote?',
        answer: 'Your polling location is usually assigned based on your registered address. You can typically find it by checking your local election commission website or looking at the voter card mailed to you.'
    },
    {
        keywords: ['id', 'identification', 'bring', 'need'],
        question: 'Do I need ID to vote?',
        answer: 'Requirements vary widely by region. Some places require a government-issued photo ID, others accept utility bills, and some only require your signature. Always check your local rules before heading to the polls.'
    },
    {
        keywords: ['absentee', 'mail', 'early', 'travel'],
        question: 'Can I vote if I\'m away on election day?',
        answer: 'Most systems offer "absentee" or "mail-in" voting. You usually have to request a ballot in advance, fill it out, and return it by mail or at a drop box before a specific deadline.'
    },
    {
        keywords: ['what', 'happen', 'tie', 'draw'],
        question: 'What happens if there is a tie?',
        answer: 'Tie-breaking rules vary. In some local elections, it might literally come down to a coin toss or drawing straws! In larger elections, a runoff election might be held between the tied candidates.'
    }
];

/**
 * Initializes the interactive timeline by dynamically generating HTML
 * elements for each step in the electionSteps array.
 */
function initTimeline() {
    const timelineContainer = document.getElementById('timeline-items');
    
    electionSteps.forEach((step, index) => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.tabIndex = 0;
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Learn more about ${step.title}`);
        
        item.innerHTML = `
            <div class="timeline-icon" aria-hidden="true">
                <i class="fa-solid ${step.icon}"></i>
            </div>
            <div class="timeline-content glass-panel">
                <h3>${index + 1}. ${step.title}</h3>
                <p>${step.shortDesc}</p>
                <span class="read-more" aria-hidden="true">Learn more <i class="fa-solid fa-arrow-right"></i></span>
            </div>
        `;
        
        const openModalHandler = () => openModal(step);
        item.addEventListener('click', openModalHandler);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModalHandler();
            }
        });
        timelineContainer.appendChild(item);
    });
}

/**
 * Opens the modal and populates it with the details of the selected step.
 * 
 * @param {ElectionStep} step - The election step data object.
 */
function openModal(step) {
    const modal = document.getElementById('step-modal');
    const closeBtn = document.querySelector('.close-btn');
    if (!modal) return;
    
    document.getElementById('modal-title').textContent = step.title;
    document.getElementById('modal-icon').innerHTML = `<i class="fa-solid ${step.icon}"></i>`;
    document.getElementById('modal-description').textContent = step.longDesc;
    
    const factsContainer = document.getElementById('modal-facts');
    factsContainer.innerHTML = '';
    step.facts.forEach(fact => {
        const factEl = document.createElement('div');
        factEl.className = 'fact-item';
        factEl.innerHTML = `<i class="fa-solid fa-check" style="color: var(--secondary); margin-right: 10px;"></i> ${fact}`;
        factsContainer.appendChild(factEl);
    });
    
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    if (closeBtn) closeBtn.focus();
}

/**
 * Initializes the modal component, setting up event listeners for closing
 * the modal via click and keyboard events.
 */
function initModal() {
    const modal = document.getElementById('step-modal');
    const closeBtn = document.querySelector('.close-btn');
    if (!modal || !closeBtn) return;

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    });
}

/**
 * Initializes the civic assistant chat interface by creating clickable
 * question chips based on the qaDatabase array.
 */
function initAssistant() {
    const chipsContainer = document.getElementById('question-chips');
    const chatArea = document.getElementById('chat-area');
    
    // Create chips
    qaDatabase.forEach(qa => {
        const chip = document.createElement('div');
        chip.className = 'chip';
        chip.textContent = qa.question;
        chip.tabIndex = 0;
        chip.setAttribute('role', 'button');
        
        const askQuestion = () => handleQuestion(qa.question, qa.answer);
        chip.addEventListener('click', askQuestion);
        chip.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                askQuestion();
            }
        });
        chipsContainer.appendChild(chip);
    });
}

/**
 * Handles user interactions with the assistant, appending the user's question
 * to the chat area and simulating a response delay.
 * 
 * @param {string} question - The user's question.
 * @param {string} answer - The assistant's response.
 */
function handleQuestion(question, answer) {
    const chatArea = document.getElementById('chat-area');
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user-message';
    userMsg.textContent = question;
    chatArea.appendChild(userMsg);
    
    // Scroll to bottom
    chatArea.scrollTop = chatArea.scrollHeight;
    
    // Simulate typing delay
    setTimeout(() => {
        const assistantMsg = document.createElement('div');
        assistantMsg.className = 'message assistant-message';
        assistantMsg.innerHTML = answer;
        chatArea.appendChild(assistantMsg);
        
        // Scroll to bottom again
        chatArea.scrollTop = chatArea.scrollHeight;
    }, 600);
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initTimeline();
    initAssistant();
    initModal();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        electionSteps,
        qaDatabase,
        handleQuestion
    };
}
