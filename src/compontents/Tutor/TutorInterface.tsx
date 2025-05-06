import React from 'react';
import { MessageCircle, Mic } from 'lucide-react';
import { useTutor } from '../../context/TutorContext';
import VoiceInterface from './VoiceInterface';
import ChatInterface from './ChatInterface';

const TutorInterface: React.FC = () => {
  const { file, fileStatus, mode, setMode } = useTutor();
  
  // Only show when we have a processed file
  if (!file || fileStatus !== 'ready') return null;
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Learning from: <span className="text-purple-400">{file.name}</span>
            </h2>
            <p className="text-gray-400">
              Your AI tutor is ready to help you learn this material. Ask anything!
            </p>
          </div>
          
          <div className="flex p-1 bg-gray-800/70 rounded-lg">
            <button
              onClick={() => setMode('voice')}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300
                ${mode === 'voice' 
                  ? 'bg-gradient-to-r from-purple-500/90 to-blue-500/90 text-white' 
                  : 'text-gray-300 hover:text-white'}
              `}
            >
              <Mic className="w-5 h-5" />
              <span>Voice</span>
            </button>
            
            <button
              onClick={() => setMode('chat')}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300
                ${mode === 'chat' 
                  ? 'bg-gradient-to-r from-purple-500/90 to-blue-500/90 text-white' 
                  : 'text-gray-300 hover:text-white'}
              `}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
        <VoiceInterface />
        <ChatInterface />
      </div>
    </div>
  );
};

export default TutorInterface;