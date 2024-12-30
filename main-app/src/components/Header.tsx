import React from 'react';
import { Menu, X, Terminal } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-slate-900 text-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Terminal className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">DevOps Pro</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#curriculum" className="hover:text-blue-400 transition-colors">Curriculum</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
            <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
          </div>

          <a 
            href="#apply" 
            className="hidden md:block px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Apply Now
          </a>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <a href="#features" className="block hover:text-blue-400">Features</a>
            <a href="#curriculum" className="block hover:text-blue-400">Curriculum</a>
            <a href="#projects" className="block hover:text-blue-400">Projects</a>
            <a href="#pricing" className="block hover:text-blue-400">Pricing</a>
            <a 
              href="#apply" 
              className="block w-full px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-center"
            >
              Apply Now
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}