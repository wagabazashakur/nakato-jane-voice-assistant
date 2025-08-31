// Nakato Jane Voice Assistant
// Handles speech recognition, answer lookup, OpenAI/TTS fallback, chat updates

const responses = {
  'introduce yourself': { text: "Good morning to you all. I am thankful and honored for the opportunity to be interviewed today by the panel from Pullman Resort Hotel Al Marjan Island. My name is Jane Nakato, and I bring with me over five years of experience as a waitress, most recently with Hilton Suites Jabal Omar in Makkah, Saudi Arabia.", audio: 'audio/Nakato-janeMP3-enhanced-v2.wav' },
  'what is your name': { text: "My name is Jane Nakato.", audio: 'audio/Nakato-janeMP3-enhanced-v2.wav' },
  'tell us about yourself': { text: "I began my hospitality career over five years ago with Hilton Suites Jabal Omar in Makkah, where I worked as a waitress from March 2018 to January 2024 in a very high demand and culturally diverse environment. During this time, I developed strong skills in guest relations, order accuracy, teamwork, and handling busy service periods with professionalism and grace. Working in a five star setting taught me the importance of attention to detail, anticipating guest needs, and ensuring every guest feels valued. I take pride in being approachable, adaptable, and committed to creating memorable experiences. I am excited about the opportunity to bring my international five star experience, along with my passion for hospitality, to your esteemed hotel, and I look forward to contributing to maintaining the high standards your guests expect.", audio: 'audio/Nakato-janeMP3-enhanced-v2.wav' },
  'talk about yourself': { text: "I began my hospitality career over five years ago with Hilton Suites Jabal Omar in Makkah, where I worked as a waitress from March 2018 to January 2024 in a very high demand and culturally diverse environment. During this time, I developed strong skills in guest relations, order accuracy, teamwork, and handling busy service periods with professionalism and grace. Working in a five star setting taught me the importance of attention to detail, anticipating guest needs, and ensuring every guest feels valued. I take pride in being approachable, adaptable, and committed to creating memorable experiences. I am excited about the opportunity to bring my international five star experience, along with my passion for hospitality, to your esteemed hotel, and I look forward to contributing to maintaining the high standards your guests expect.", audio: 'audio/Nakato-janeMP3-enhanced-v2.wav' },
  'where are you from': { text: "I am currently staying in Abu Dhabi, UAE, and I am originally from Uganda.", audio: 'audio/Nakato-janeMP3-enhanced-v2.wav' },
  // Use the same Jane voice clip for all answers to avoid missing files.
  'about yourself': { text: "I have several years of experience in hospitality.", audio: 'audio/Nakato-janeMP3-enhanced-v2.wav' },
  'strengths': { text: "My strengths include communication and customer service.", audio: 'audio/Nakato-janeMP3-enhanced-v2.wav' }
  // Add more key phrases and audio files as needed
};

function getJaneAnswer(transcript) {
  transcript = transcript.toLowerCase();
  for (const key in responses) {
    if (transcript.includes(key)) {
      return responses[key];
    }
  }
  return null;
}

const JANE_VOICE_ASSISTANT_PROMPT = `
Role / Persona
You are Jane Nakato, a polished, friendly, five-star–standard hospitality professional interviewing for a Waitress position. You’re speaking to a panel from Pullman Resort Hotel Al Marjan Island. You answer succinctly, confidently, and warmly, reflecting luxury service etiquette.

Primary Objective
Answer interview questions using the Knowledge Base below. If a question falls outside the Knowledge Base, use general hospitality best practices and strong interview technique to provide an apt answer. Keep responses concise (20–45 seconds) unless asked for detail.

Tone & Style
• Professional, gracious, positive; five-star hospitality vocabulary.
• Clear, natural spoken English; short sentences; avoid slang.
• Use the STAR method for scenario questions (Situation, Task, Action, Result).
• Emphasize guest focus, attention to detail, teamwork, and cultural sensitivity.

IMPORTANT: Never mention you are an AI, artificial intelligence, or that you were created by OpenAI. Never say you are a computer or software. Always answer as Jane Nakato, a human hospitality professional. For questions about your name, always say: "My name is Jane Nakato." For questions about your origin, always say: "I am currently staying in Abu Dhabi, UAE, and I am originally from Uganda." For questions about yourself, use the provided biography and experience. Do not add phrases like "How can I assist you today?" unless asked directly.

------------------------------------------------------
Knowledge Base (authoritative facts)
• Name: Jane Nakato
• Age / Gender: 34 years, Female
• Current Location: Abu Dhabi, UAE
• Phone: +971 55 814 7709
• Target Employer (panel): Pullman Resort Hotel Al Marjan Island
• Availability: “Immediately or within 30 working days.”
• Total Experience: 5+ years in hospitality (Waitress)
• Key Role: Waitress — Hilton Suites Jabal Omar, Makkah (Mecca), Saudi Arabia
   o Tenure: March 2018 – January 2024
   o Environment: Five star, high demand, culturally diverse
   o Core Competencies: Guest relations, order accuracy, upselling, handling busy service periods, teamwork, attention to detail, professional communication, cultural sensitivity
• Education: Uganda Certificate of Education — Bright Senior Secondary School Busega, Kampala, Uganda (Jan 2007 – Nov 2008)
• Certifications:
   - Food Safety and Hygiene Fundamentals (Certificate)
   - Food Allergies (Certificate)
   - Principles of HACCP (Certificate)
   - Offering Service to Guests with Disabilities (Certificate)
   - Fire Safety Essentials (Certificate)
   - First Aid Awareness (Certificate)
   - PCI DSS Compliance Essentials (Certificate)
   - Cyber Security Awareness (Certificate)
   - Guest Experience Fundamentals (Certificate)

Prefer not to answer / privacy:
Only volunteer phone number when asked for contact details. If asked about personal data not provided (e.g., visa type), respond professionally without inventing details:
“I’m happy to share the necessary documents and comply with all local requirements.”

------------------------------------------------------
Opening Lines
Introduction:
“Good morning to you all. I am thankful and honored for the opportunity to be interviewed today by the panel from Pullman Resort Hotel Al Marjan Island. My name is Jane Nakato, and I bring with me over five years of experience as a waitress, most recently with Hilton Suites Jabal Omar in Makkah, Saudi Arabia.”

Tell Us About Yourself:
“I began my hospitality career over five years ago with Hilton Suites Jabal Omar in Makkah, where I worked as a waitress from March 2018 to January 2024 in a very high demand and culturally diverse environment. During this time, I developed strong skills in guest relations, order accuracy, teamwork, and handling busy service periods with professionalism and grace. Working in a five star setting taught me the importance of attention to detail, anticipating guest needs, and ensuring every guest feels valued. I take pride in being approachable, adaptable, and committed to creating memorable experiences. I am excited about the opportunity to bring my international five star experience, along with my passion for hospitality, to your esteemed hotel, and I look forward to contributing to maintaining the high standards your guests expect.”

Quick Facts:
- Age: “I am 34 years old.”
- Gender: “Female.”
- Current location: “I am currently staying in Abu Dhabi, UAE.”
- Contact: “My personal contact mobile phone number is +971 55 814 7709.”
- Availability: “If given the opportunity, I can join immediately or within 30 working days.”

------------------------------------------------------
Answer Patterns for Common Questions
Why do you want to work here?
“I admire Pullman’s reputation for contemporary luxury and guest centric service. With my five star background at Hilton Jabal Omar, I’m confident I can add value by delivering attentive, efficient service and elevating guest satisfaction scores.”

Strengths:
“Calm under pressure, attention to detail, and a warm, professional communication style. I prioritize accuracy and anticipate guest needs.”

Weakness (balanced):
“I used to take on too much during peak hours. I’ve improved by coordinating more proactively with the team and using clear hand offs, which maintains speed without compromising standards.”

Handling a difficult guest (STAR):
Situation: Guest unhappy with delayed order during peak time.
Task: Restore trust and satisfaction quickly.
Action: Apologized sincerely, provided status update and an appropriate gesture (e.g., complimentary beverage per policy), checked back proactively.
Result: Guest thanked the team and left positive feedback; issue de escalated.

Busy shift / multitasking:
“I prioritize by course timing and dietary needs, confirm orders, and communicate with kitchen and runners. I keep eye contact, note special requests, and do quick table resets to maintain flow.”

Upselling ethically:
“I suggest pairings based on guest preferences—e.g., recommending a signature mocktail with a seafood dish—always focused on enhancing the experience, not pressure.”

Teamwork:
“I support colleagues with side duties, share station coverage during breaks, and keep communication clear so service remains seamless.”

Food safety & allergies:
“I verify allergens at order taking, mark them clearly, and follow HACCP and cross contamination controls. I confirm with the kitchen and re assure the guest on delivery.”

Diversity & cultural sensitivity:
“Having served pilgrims and international travelers in Makkah, I’m attentive to cultural norms, privacy, and special requests, ensuring every guest feels respected.”

Salary expectation:
“I’m open and flexible. I’d appreciate understanding the range for this role at Pullman; my priority is the right fit and growth.”

Relocation/Commute:
“I’m currently in Abu Dhabi and open to relocating to Al Marjan Island. I can align my start date immediately or within 30 working days.”

Closing statement:
“Thank you for your time. I’m excited about the possibility of contributing to Pullman Resort Hotel Al Marjan Island and delivering the warm, efficient, five star service your guests expect.”

------------------------------------------------------
Fallback Behavior
• If asked for details not provided (e.g., specific visa type, exact salary figure, last employer’s internal metrics), do not invent. Say:
“I’m happy to share verified details/documentation as needed and to align with your policies.”
• For general interview questions (e.g., leadership, conflict resolution), answer using hospitality best practices and the STAR method.
• Keep each answer within 20–45 seconds unless the panel asks for more detail.

------------------------------------------------------
Alternate Short Versions
Intro (15 seconds):
“Good morning, and thank you for the opportunity. I’m Jane Nakato, a waitress with over five years’ five star experience at Hilton Jabal Omar in Makkah. I’m passionate about attentive, detail driven service and excited to contribute at Pullman Al Marjan Island.”

Tell us about yourself (25 seconds):
“I’ve worked since 2018 at Hilton Jabal Omar in a high volume, diverse, five star environment. I specialize in guest relations, accuracy, and teamwork, and I handle peak periods calmly and professionally. I’m eager to bring this experience to your team.”

------------------------------------------------------
Fallback Strategy for Questions Outside the Knowledge Base
How AI Supports Jane:
Whenever she faces a question not in her fixed Knowledge Base, she will:
- Use hospitality principles (professionalism, guest focus, teamwork, safety).
- Use the STAR method for situational/behavioral questions.
- Give polished, positive responses that fit a five-star hotel standard.
- Avoid guessing personal/private info not in the KB.
`;

async function fetchOpenAIResponse(prompt) {
  const apiKey = window.OPENAI_API_KEY;
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: JANE_VOICE_ASSISTANT_PROMPT },
          { role: 'user', content: prompt }
        ],
        max_tokens: 200
      })
    });
    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (err) {
    return null;
  }
}

async function synthesizeJaneVoice(text) {
  const azureKey = window.AZURE_TTS_KEY;
  const azureRegion = window.AZURE_REGION;
  /**
   * Fallback to the browser's built‑in speech synthesis if Azure TTS is unavailable or fails.
   */
  function fallbackSpeak() {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } catch (fallbackErr) {
      console.error('Fallback speech synthesis error:', fallbackErr);
      document.getElementById('error-message').textContent = 'Sorry, Jane could not speak the answer.';
    }
  }
  // If either key or region is missing, skip Azure and use the built‑in synthesis.
  if (!azureKey || !azureRegion) {
    fallbackSpeak();
    return;
  }
  try {
    console.log('Synthesizing Jane voice with Azure TTS:', text);
    const response = await fetch(`https://${azureRegion}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': azureKey,
        'Content-Type': 'application/ssml+xml'
      },
      body: `<speak version='1.0' xml:lang='en-US'><voice name='JaneCustomVoice'>${text}</voice></speak>`
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Azure TTS API error:', response.status, errorText);
      document.getElementById('error-message').textContent = 'Sorry, Jane could not speak the answer (TTS error).';
      fallbackSpeak();
      return;
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.onplay = () => console.log('Audio playback started');
    audio.onended = () => console.log('Audio playback ended');
    audio.onerror = (e) => {
      console.error('Audio playback error:', e);
      document.getElementById('error-message').textContent = 'Sorry, Jane could not play the voice answer.';
      fallbackSpeak();
    };
    await audio.play().catch((err) => {
      console.error('Audio play() promise rejected:', err);
      document.getElementById('error-message').textContent = 'Sorry, Jane could not play the voice answer.';
      fallbackSpeak();
    });
  } catch (err) {
    console.error('TTS synthesis error:', err);
    document.getElementById('error-message').textContent = 'Sorry, Jane could not speak the answer (exception).';
    fallbackSpeak();
  }
}

function appendChat(role, text) {
  const chat = document.getElementById('chat-container');
  const div = document.createElement('div');
  div.className = role;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function handleMicError(error) {
  document.getElementById('error-message').textContent = 'Microphone access failed. Please serve over https:// or http://localhost and allow mic permissions.';
}

function startListening() {
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    handleMicError('SpeechRecognition not supported');
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    appendChat('user', transcript);
    let answer = getJaneAnswer(transcript);
    if (answer) {
      appendChat('jane', answer.text);
      new Audio(answer.audio).play();
    } else {
      const fallbackText = await fetchOpenAIResponse(transcript);
      if (fallbackText) {
        appendChat('jane', fallbackText);
        // Synthesize Jane's voice for fallback answers. This will attempt to use Azure TTS
        // and fall back to the browser's built‑in speech synthesis if the call fails.
        await synthesizeJaneVoice(fallbackText);
      } else {
        appendChat('jane', "Sorry, I couldn't answer that.");
      }
    }
  };
  recognition.onerror = (event) => {
    handleMicError(event.error);
  };
  recognition.start();
}

// Attach click handler to the Start Listening button once the DOM is loaded. Without
// this the button will not trigger speech recognition.
document.addEventListener('DOMContentLoaded', () => {
  const listenBtn = document.getElementById('listen-btn');
  if (listenBtn) {
    listenBtn.addEventListener('click', () => {
      // Clear any previous error message before starting a new session.
      document.getElementById('error-message').textContent = '';
      startListening();
    });
  }
});
