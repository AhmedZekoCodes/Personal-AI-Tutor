import { useState, useCallback } from 'react';
import { useTutor } from '../context/TutorContext';

// Mock function to simulate AI responses
const generateAIResponse = async (prompt: string, fileContent?: string): Promise<string> => {
  // In a real app, this would call the ChatGPT API with the prompt and file content
  return new Promise((resolve) => {
    setTimeout(() => {
      const responses = [
        "Based on the uploaded document, I can explain this concept more clearly. The key point is that...",
        "That's an excellent question about this material. According to your document...",
        "I noticed in your file that this topic is covered in detail. The main ideas are...",
        "Let me elaborate on that concept from your lecture notes. The author emphasizes...",
        "Looking at your syllabus, I can see why this might be confusing. Let me break it down for you..."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      resolve(randomResponse);
    }, 1500);
  });
};

export const useChatGPT = () => {
  const { file, addMessage, setIsSpeaking } = useTutor();
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    addMessage({
      role: 'user',
      content
    });
    
    setIsLoading(true);
    
    try {
      // Generate AI response
      const response = await generateAIResponse(content, file?.content);
      
      // Add AI response
      addMessage({
        role: 'assistant',
        content: response
      });
      
      // In voice mode, this would trigger speaking
      setIsSpeaking(true);
      
      // Simulate speech completion
      setTimeout(() => {
        setIsSpeaking(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error generating response:', error);
      
      addMessage({
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  }, [file, addMessage, setIsSpeaking]);

  return {
    sendMessage,
    isLoading
  };
};