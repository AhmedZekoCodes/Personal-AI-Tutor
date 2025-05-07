import React, { useCallback, useState } from 'react';
import { FileUp, FileText, X } from 'lucide-react';
import { useFileUpload } from '../../hooks/useFileUpload';
import { useTutor } from '../../context/TutorContext';

const FileUpload: React.FC = () => {
  const { fileStatus } = useTutor();
  const { uploadFile, error, setError } = useFileUpload();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFile(e.dataTransfer.files[0]);
    }
  }, [uploadFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFile(e.target.files[0]);
      e.target.value = ''; // Reset the input
    }
  }, [uploadFile]);

  const isProcessing = fileStatus === 'uploading' || fileStatus === 'processing';

  if (fileStatus === 'ready') {
    return null; // Don't render when file is ready and we're in tutoring mode
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div 
        className={`
          relative mt-8 p-8 rounded-xl border-2 border-dashed transition-all duration-300
          ${isDragging 
            ? 'border-purple-400 bg-purple-500/10 shadow-lg shadow-purple-500/20' 
            : 'border-gray-600 bg-gray-800/50 hover:bg-gray-800/80'}
          ${isProcessing ? 'pointer-events-none opacity-70' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className={`
            p-4 rounded-full bg-gradient-to-br transition-all duration-300
            ${isDragging 
              ? 'from-purple-600/30 to-blue-600/30 shadow-lg shadow-purple-500/20' 
              : 'from-gray-700 to-gray-800'}
          `}>
            {isProcessing ? (
              <div className="animate-spin">
                <FileText className="w-10 h-10 text-purple-400" />
              </div>
            ) : (
              <FileUp className={`
                w-10 h-10 transition-all duration-300
                ${isDragging ? 'text-purple-400' : 'text-gray-400'}
              `} />
            )}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              {isProcessing ? 'Processing your file...' : 'Drop your lecture file or syllabus here'}
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              {isProcessing 
                ? 'We\'re analyzing your document to provide personalized tutoring.' 
                : 'Upload your presentations, lectures, or even just a syllabus!'}
            </p>
          </div>
          
          {!isProcessing && (
            <div className="mt-4">
              <label className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg cursor-pointer hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
                Select File
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.pptx,.docx,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 flex items-center gap-2">
              <span>{error}</span>
              <button 
                onClick={() => setError(null)}
                className="text-red-300 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
