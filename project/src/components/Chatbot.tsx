import { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

// Gemini API configuration
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const GEMINI_API_KEY = 'AIzaSyDCd8lB1KEO0rBgpIJ8jtBT5xxuMPSRRLk'; // Replace with your Gemini API key

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(true); // Bot is open by default
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { user: input, bot: '...' }];
    setMessages(newMessages);

    try {
      // Send user input to Gemini API
      const response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: input }], // User's input
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Extract the bot's response
      const candidates = response.data?.candidates || [];
      let botReply = 'Sorry, I didn’t understand that.';

      if (candidates.length > 0) {
        const contentParts = candidates[0]?.content?.parts || [];
        const textParts = contentParts.map((part: { text: string }) => `• ${part.text}`).join('\n');

        // Check for citation metadata (URLs)
        const citationSources = candidates[0]?.citationMetadata?.citationSources || [];
        const urls = citationSources.map((source: { uri: string }) => source.uri).join('\n');

        botReply = `
          <div>
            <p>${textParts.replace(/\n/g, '<br>')}</p>
            ${urls ? `<p><strong>Sources:</strong><br>${urls}</p>` : ''}
          </div>
        `;
      }

      setMessages([...newMessages.slice(0, -1), { user: input, bot: botReply }]);
    } catch (error) {
      console.error('Error communicating with Gemini API:', error);
      setMessages([...newMessages.slice(0, -1), { user: input, bot: 'Sorry, something went wrong.' }]);
    }

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <div className="bnbee-header">
        <img src="/src/assets/logo.svg" alt="BnBee Logo" className="bnbee-logo" />
        <h1>Welcome to BnBee</h1>
        <p>
          Your ultimate travel assistant! BnBee can help you plan trips, find travel hacks, discover the best food spots, 
          book cheap flights, and even create personalized travel itineraries. Experience destinations virtually with our VR feature!
        </p>
      </div>

      {isOpen && (
        <div className="chatbot-modal">
          <div className="chatbot-header">
            <h3>BnBee - Your Travel Assistant</h3>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className="message">
                <p><strong>User:</strong> {msg.user}</p>
                <p><strong>BnBee:</strong> <span dangerouslySetInnerHTML={{ __html: msg.bot }} /></p>
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about travel..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;