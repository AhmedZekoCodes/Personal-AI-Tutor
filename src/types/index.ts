export type FileStatus = 'idle' | 'uploading' | 'processing' | 'ready' | 'error';

export type TutorMode = 'voice' | 'chat';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  content?: string;
}