import React from 'react';
import { GraduationCap } from 'lucide-react';
import { useTutor } from '../../context/TutorContext';

const Header: React.FC = () => {
  const { resetSession } = useTutor();

  return (
    <header className="w-full px-6 py-4 bg-black/30 backdrop-blur-md fixed top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button 
          onClick={resetSession}
          className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
        >
          <GraduationCap className="w-8 h-8 text-purple-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            DropLearn.io
          </span>
        </button>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
        </nav>
        
        <div>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;