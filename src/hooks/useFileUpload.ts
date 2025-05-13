import { useState, useCallback } from 'react';
import { FileStatus, UploadedFile } from '../types';
import { useTutor } from '../context/TutorContext';

// Mock function to simulate file processing
const processFile = async (file: File): Promise<string> => {
  // In a real app, this would send the file to a backend service for processing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Processed content of ${file.name}`);
    }, 2000);
  });
};

export const useFileUpload = () => {
  const { setFile, setFileStatus, addMessage } = useTutor();
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a PDF, PPTX, or DOCX file.');
      return false;
    }

    if (file.size > maxSize) {
      setError('File is too large. Maximum size is 10MB.');
      return false;
    }

    return true;
  };

  const uploadFile = useCallback(async (file: File) => {
    setError(null);
    
    if (!validateFile(file)) {
      return;
    }

    try {
      setFileStatus('uploading');
      
      // Create an uploaded file object
      const uploadedFile: UploadedFile = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        size: file.size
      };
      
      setFile(uploadedFile);
      
      // Process the file (in a real app, this would involve sending to backend)
      setFileStatus('processing');
      const content = await processFile(file);
      
      // Update with processed content
      setFile({
        ...uploadedFile,
        content
      });
      
      setFileStatus('ready');
      
      // Add initial welcome message
      addMessage({
        role: 'assistant',
        content: `I've analyzed "${file.name}". What would you like to learn about this material?`
      });
      
    } catch (err) {
      setFileStatus('error');
      setError('An error occurred while processing your file. Please try again.');
      console.error(err);
    }
  }, [setFile, setFileStatus, addMessage]);

  return {
    uploadFile,
    error,
    setError
  };
};