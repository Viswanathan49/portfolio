import React, { useState, useRef, useEffect } from 'react';
import './ContactSection.css';

export default function ContactSection() {
  const [messages, setMessages] = useState([
    { sender: 'agent', text: "Initializing connection... I am Viswanathan's assistant. Who am I speaking with?" }
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateAgentResponse = async (text, delay = 800) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    setIsTyping(false);
    setMessages(prev => [...prev, { sender: 'agent', text }]);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    if (step === 1) {
      setFormData(prev => ({ ...prev, name: userMsg }));
      setStep(2);
      await simulateAgentResponse(`Greetings, ${userMsg}. What email address should Viswanathan use to respond to you?`);
    } 
    else if (step === 2) {
      if (!validateEmail(userMsg)) {
        await simulateAgentResponse("Error: Invalid email format. Please provide a valid Comms_Link (Email).");
        return; // Stay on step 2
      }
      setFormData(prev => ({ ...prev, email: userMsg }));
      setStep(3);
      await simulateAgentResponse("Perfect. What message would you like to transmit?");
    } 
    else if (step === 3) {
      const finalData = { ...formData, message: userMsg };
      setFormData(finalData);
      setStep(4);
      setIsTyping(true);
      
      try {
        const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || 'https://api.web3forms.com/submit';
        
        // Mock network delay to simulate processing & API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        /* 
        // Actual fetch request to endpoint
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData)
        });
        */
        
        setIsTyping(false);
        setMessages(prev => [...prev, { sender: 'agent', text: 'Transmission secured. Logging data and routing to Viswanathan.' }]);
      } catch (error) {
        setIsTyping(false);
        setMessages(prev => [...prev, { sender: 'agent', text: 'Error: Connection lost. Transmission failed.' }]);
      }
    }
  };

  const handleKeyDown = (e) => {
    // Allows sending with Enter, but Shift+Enter adds a new line in textarea
    if (step === 3 && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <h2><span className="neon-text">//</span> Establish_Connection_</h2>
      
      <div className="chat-window">
        <div className="chat-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="chat-title">AI_Agent_Link</span>
        </div>
        
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.sender}`}>
              <div className="msg-bubble">
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-message agent">
              <div className="msg-bubble typing">
                <span className="dot-typing"></span>
                <span className="dot-typing"></span>
                <span className="dot-typing"></span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="chat-input-area">
          {step === 3 ? (
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Shift+Enter for new line)"
              className="chat-input"
              rows="3"
              disabled={step === 4 || isTyping}
              style={{ resize: 'none' }}
            />
          ) : (
            <input 
              type={step === 2 ? "email" : "text"} 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={step === 1 ? "Enter your name..." : step === 2 ? "Enter your email..." : "Transmission complete."}
              className="chat-input"
              disabled={step === 4 || isTyping}
            />
          )}
          <button type="submit" className="chat-send-btn" disabled={step === 4 || isTyping || !input.trim()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
