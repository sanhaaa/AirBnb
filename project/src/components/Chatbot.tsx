import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

// Gemini API configuration
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const GEMINI_API_KEY = 'AIzaSyDCd8lB1KEO0rBgpIJ8jtBT5xxuMPSRRLk'; 

interface ChatbotProps {
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState('');
  const [showWatermark, setShowWatermark] = useState(true);
  const chatbotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setShowWatermark(false);

    const newMessages = [...messages, { user: userMessage, bot: '...' }];
    setMessages(newMessages);

    try {
      // Send user input to Gemini API
      const response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: userMessage }], // User's input
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
        // Clean and format the response text
        const textParts = contentParts.map((part: { text: string }) => {
          return part.text
            .replace(/\*\*/g, '') // Remove all asterisks
            .split('\n') // Split into lines
            .filter(line => line.trim()) // Remove empty lines
            .map(line => line.trim().replace(/^\*\s*/, '• ')) // Replace any remaining asterisks with bullets
            .join('\n'); // Join back with newlines
        }).join('\n');

        // Check for citation metadata (URLs)
        const citationSources = candidates[0]?.citationMetadata?.citationSources || [];
        const urls = citationSources.map((source: { uri: string }) => source.uri).join('\n');

        // Format the response with HTML
        botReply = `
          <div class="bot-response">
            ${textParts.split('\n').map((line: string) => `<p>${line}</p>`).join('')}
            ${citationSources?.length ? `<p class="sources"><strong>Sources:</strong><br>${urls}</p>` : ''}
          </div>
        `;
      }

      setMessages([...newMessages.slice(0, -1), { user: userMessage, bot: botReply }]);
    } catch (error) {
      console.error('Error communicating with Gemini API:', error);
      setMessages([...newMessages.slice(0, -1), { user: userMessage, bot: 'Sorry, something went wrong.' }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="chatbot-modal" ref={chatbotRef}>
          <div className="chatbot-header">
            <h3>
              <span className="bee-icon">🐝</span>
              BnBee Travel Assistant
            </h3>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="chatbot-messages">
            {showWatermark && (
              <div className={`welcome-watermark ${messages.length > 0 ? 'hidden' : ''}`}>
                <div className="welcome-message-header">
                  <span className="bee-icon">🐝</span>
                  <div>
                    <h4 className="text-xl font-semibold mb-1">Hi! I'm BnBee</h4>
                    <p className="text-sm text-gray-600">Your AI Travel Companion</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  Ready to create your perfect travel experience? I'm here to help with:
                </p>
                
                <div className="welcome-features">
                  <div className="feature-item">
                    <span>✨</span>
                    <span>Personalized travel itineraries</span>
                  </div>
                  <div className="feature-item">
                    <span>🗺️</span>
                    <span>Local hidden gems and attractions</span>
                  </div>
                  <div className="feature-item">
                    <span>🏠</span>
                    <span>Accommodation recommendations</span>
                  </div>
                  <div className="feature-item">
                    <span>🎯</span>
                    <span>Budget-friendly travel tips</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mt-4">
                  Let's start planning your next adventure! 🌍✨
                </p>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div key={i} className="message">
                <div className="user-message">{msg.user}</div>
                <div className="bot-message">
                  <span dangerouslySetInnerHTML={{ __html: msg.bot }} />
                </div>
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