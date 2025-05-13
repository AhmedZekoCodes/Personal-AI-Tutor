import React from 'react';
import { TutorProvider } from './context/TutorContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import FileUpload from './components/FileUpload/FileUpload';
import TutorInterface from './components/Tutor/TutorInterface';

function App() {
  return (
    <TutorProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
        <Header />
        
        <main className="flex-1 flex flex-col items-center justify-center w-full pt-20 pb-8">
          <div className="w-full max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Learn Faster with AI Tutoring
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Upload your lecture notes or syllabus and get instant, personalized tutoring from our AI tutor.
              </p>
            </div>
          </div>
          
          <FileUpload />
          <TutorInterface />
        </main>
        
        <Footer />
        
        {/* Background decoration */}
        <div className="fixed top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-20 -z-10" />
        <div className="fixed bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl opacity-20 -z-10" />
      </div>
    </TutorProvider>
  );
}

export default App;