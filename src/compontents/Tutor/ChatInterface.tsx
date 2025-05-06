import React, { useRef, useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useTutor } from '../../context/TutorContext';
import { useChatGPT } from '../../hooks/useChatGPT';
import { Message } from '../../types';

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div 
      className={`flex w-full mb-4 ${isAssistant ? 'justify-start' : 'justify-end'}`}
    >
      <div 
        className={`
          max-w-[80%] p-4 rounded-xl 
          ${isAssistant 
            ? 'bg-gray-800/70 text-gray-100 rounded-tl-none' 
            : 'bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white rounded-tr-none'}
        `}
      >
        <p className="leading-relaxed">{message.content}</p>
        <div className="text-xs text-right mt-1 opacity-60">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

const ChatInterface: React.FC = () => {
  const { messages, mode } = useTutor();
  const { sendMessage, isLoading } = useChatGPT();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };
  
  // Hide if not in chat mode
  if (mode !== 'chat') return null;
  
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[calc(70vh-2rem)]">
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-center">
              No messages yet. Start by asking a question about your uploaded material.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-700/50">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your document..."
            className="flex-1 px-4 py-3 bg-gray-800/70 border border-gray-700/50 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-100"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`
              p-3 rounded-lg text-white transition-all duration-300
              ${isLoading || !input.trim() 
                ? 'bg-gray-700 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-purple-500/20'}
            `}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;