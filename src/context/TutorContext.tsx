import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FileStatus, Message, TutorMode, UploadedFile } from '../types';

interface TutorContextType {
  file: UploadedFile | null;
  fileStatus: FileStatus;
  messages: Message[];
  mode: TutorMode;
  isSpeaking: boolean;
  isListening: boolean;
  setFile: (file: UploadedFile | null) => void;
  setFileStatus: (status: FileStatus) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setMode: (mode: TutorMode) => void;
  setIsSpeaking: (isSpeaking: boolean) => void;
  setIsListening: (isListening: boolean) => void;
  resetSession: () => void;
}

const TutorContext = createContext<TutorContextType | undefined>(undefined);

export const TutorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [fileStatus, setFileStatus] = useState<FileStatus>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState<TutorMode>('voice');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const resetSession = () => {
    setFile(null);
    setFileStatus('idle');
    setMessages([]);
    setMode('voice');
    setIsSpeaking(false);
    setIsListening(false);
  };

  const value = {
    file,
    fileStatus,
    messages,
    mode,
    isSpeaking,
    isListening,
    setFile,
    setFileStatus,
    addMessage,
    setMode,
    setIsSpeaking,
    setIsListening,
    resetSession,
  };

  return <TutorContext.Provider value={value}>{children}</TutorContext.Provider>;
};

export const useTutor = () => {
  const context = useContext(TutorContext);
  if (context === undefined) {
    throw new Error('useTutor must be used within a TutorProvider');
  }
  return context;
};