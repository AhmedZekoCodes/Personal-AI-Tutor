import React, { useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useTutor } from '../../context/TutorContext';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';
import VoiceVisualizer from './VoiceVisualizer';

const VoiceInterface: React.FC = () => {
  const { isSpeaking, setIsSpeaking, mode } = useTutor();
  const { 
    isListening, 
    toggleListening, 
    transcript, 
    isSupported 
  } = useVoiceRecognition();

  // Hide if not in voice mode
  if (mode !== 'voice') return null;
  
  // If speech recognition isn't supported, show message and fallback
  if (!isSupported) {
    return (
      <div className="w-full p-4 text-center rounded-lg bg-red-900/20 border border-red-700/30">
        <p className="text-red-300">
          Voice recognition is not supported in your browser. Please use the chat interface instead.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center justify-center w-full p-6 gap-8">
        <div className="flex flex-col items-center">
          <div 
            className={`
              relative p-4 rounded-full mb-2
              ${isListening 
                ? 'bg-purple-900/30 shadow-lg shadow-purple-600/20 animate-pulse' 
                : 'bg-gray-800/50 hover:bg-gray-700/50'}
              transition-all duration-300
            `}
          >
            <button
              onClick={toggleListening}
              className="text-white p-2 rounded-full"
              aria-label={isListening ? 'Stop listening' : 'Start listening'}
            >
              {isListening ? (
                <MicOff className="w-8 h-8 text-purple-400" />
              ) : (
                <Mic className="w-8 h-8 text-gray-400 hover:text-purple-400 transition-colors" />
              )}
            </button>
            
            {isListening && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-ping" />
            )}
          </div>
          <VoiceVisualizer isActive={true} type="listening" />
          <span className="text-sm text-gray-400 mt-2">
            {isListening ? 'Listening...' : 'Click to speak'}
          </span>
        </div>
        
        <div className="flex flex-col items-center">
          <div 
            className={`
              relative p-4 rounded-full mb-2
              ${isSpeaking 
                ? 'bg-blue-900/30 shadow-lg shadow-blue-600/20' 
                : 'bg-gray-800/50'}
              transition-all duration-300
            `}
          >
            <button
              onClick={() => setIsSpeaking(!isSpeaking)}
              className="text-white p-2 rounded-full"
              aria-label={isSpeaking ? 'Mute' : 'Unmute'}
              disabled={!isSpeaking}
            >
              {isSpeaking ? (
                <Volume2 className="w-8 h-8 text-blue-400" />
              ) : (
                <VolumeX className="w-8 h-8 text-gray-400" />
              )}
            </button>
          </div>
          <VoiceVisualizer isActive={true} type="speaking" />
          <span className="text-sm text-gray-400 mt-2">
            {isSpeaking ? 'Speaking...' : 'AI Voice'}
          </span>
        </div>
      </div>
      
      {transcript && (
        <div className="mt-4 p-4 bg-gray-800/50 rounded-lg max-w-2xl w-full">
          <p className="text-gray-300 italic">"{transcript}"</p>
        </div>
      )}
    </div>
  );
};

export default VoiceInterface;