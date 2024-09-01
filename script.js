import { knowledgeBase } from './knowledgeBase.js'; // Adjust path if necessary

function normalizeText(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
}

function findBestMatch(userQuestion) {
    if (!userQuestion || typeof userQuestion !== 'string') {
        return "reach out as to know more information by calling xxxxxxxx45 thank you";
    }

    const userQuestionNormalized = normalizeText(userQuestion);
    let bestMatch = null;
    let highestScore = 0;

    for (let key in knowledgeBase) {
        const keyNormalized = normalizeText(key);
        const keyWords = keyNormalized.split(' ');
        let matchScore = 0;

        // Count the number of matching words
        keyWords.forEach(word => {
            if (userQuestionNormalized.includes(word)) {
                matchScore++;
            }
        });

        // Calculate match ratio based on the number of matching words
        const matchRatio = matchScore / keyWords.length;

        // Update the best match if this key has a higher score
        if (matchRatio > highestScore) {
            highestScore = matchRatio;
            bestMatch = knowledgeBase[key];
        }
    }

    // If no high-score match, try to return a more specific answer
    if (highestScore < 1) {
        // Check for common keywords to provide a general response
        const generalAnswers = {
            "address": "The school is located at ABS near DEF",
            "location": "The school is located at ABS near DEF",
            "school": "XYZ School"
        };

        for (let keyword in generalAnswers) {
            if (userQuestionNormalized.includes(keyword)) {
                return generalAnswers[keyword];
            }
        }
    }

    return bestMatch || "reach out as to know more information by calling xxxxxxxx45 thank you";
}

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const chatbox = document.getElementById('chatbox');

    if (userInput.trim() === '') {
        return;
    }

    // Display user message
    const userMessage = document.createElement('div');
    userMessage.textContent = "User: " + userInput;
    chatbox.appendChild(userMessage);

    // Check if the user wants to access the admin panel
    if (normalizeText(userInput) === 'adminpannel') {
        window.location.href = 'subject.html';
        return;
    }

    // Get the bot's response
    const botResponse = findBestMatch(userInput);

    // Display bot response
    const botMessage = document.createElement('div');
    botMessage.textContent = "Bot: " + botResponse;
    chatbox.appendChild(botMessage);

    // Clear the input field
    document.getElementById('userInput').value = '';
}

// Expose sendMessage to the global scope
window.sendMessage = sendMessage;
