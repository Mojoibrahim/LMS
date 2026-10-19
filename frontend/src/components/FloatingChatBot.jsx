import { useState } from 'react';
import './FloatingChatBot.css';

const welcomeMessage = {
  from: 'bot',
  text: 'Hi! I can help you find courses, check deadlines, or explain how your dashboard works.',
};

function getReply(message, courseCount) {
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes('course')) return `You’re enrolled in ${courseCount} courses. Open Explore courses to browse the course catalog.`;
  if (normalizedMessage.includes('session') || normalizedMessage.includes('class')) return 'Your next class is the Design principles workshop, today at 2:00 PM.';
  if (normalizedMessage.includes('submit') || normalizedMessage.includes('assignment')) return 'Open Submissions, choose an assignment, and attach your work before submitting it.';
  if (normalizedMessage.includes('payment') || normalizedMessage.includes('pay')) return 'You can initiate a payment from the Payment section using the M-Pesa form.';
  if (normalizedMessage.includes('certificate')) return 'Certificates become available after you complete a course.';

  return 'I can help with courses, class sessions, submissions, payments, or certificates. Which one would you like to know about?';
}

function ChatIcon({ close = false }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {close
        ? <path d="m18 6-12 12M6 6l12 12" />
        : <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></>}
    </svg>
  );
}

function FloatingChatBot({ courseCount = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([welcomeMessage]);

  const sendMessage = (event) => {
    event.preventDefault();
    const text = message.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      { from: 'user', text },
      { from: 'bot', text: getReply(text, courseCount) },
    ]);
    setMessage('');
  };

  return (
    <div className="floating-assistant">
      {isOpen && (
        <section className="floating-assistant-panel" aria-label="TusomeTec assistant" aria-live="polite">
          <header className="floating-assistant-header">
            <span className="floating-assistant-avatar">t</span>
            <div>
              <strong>TusomeTec Assistant</strong>
              <span>Here to help</span>
            </div>
            <button
              aria-label="Close chat"
              className="floating-assistant-close"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <ChatIcon close />
            </button>
          </header>
          <div className="floating-assistant-messages" aria-live="polite">
            {messages.map((item, index) => (
              <p className={`floating-assistant-message ${item.from}`} key={`${item.from}-${index}`}>
                {item.text}
              </p>
            ))}
          </div>
          <form className="floating-assistant-form" onSubmit={sendMessage}>
            <label className="floating-assistant-visually-hidden" htmlFor="floating-assistant-input">
              Type a message
            </label>
            <input
              autoComplete="off"
              id="floating-assistant-input"
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type a message..."
              value={message}
            />
            <button aria-label="Send message" disabled={!message.trim()} type="submit">
              Send
            </button>
          </form>
        </section>
      )}
      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        className="floating-assistant-toggle"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <ChatIcon close={isOpen} />
        <span>{isOpen ? 'Close' : 'Chat with us'}</span>
      </button>
    </div>
  );
}

export default FloatingChatBot;
