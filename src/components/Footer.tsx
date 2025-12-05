
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-zinc-950 text-gray-400 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>© {currentYear} DevPortfolio. All rights reserved.</p>
          </div>
          
          <div className="flex items-center">
            <p className="mr-4">Built with React, Tailwind CSS & ❤️</p>
            <a 
              href="#home" 
              className="bg-zinc-800 p-2 rounded-full text-white hover:bg-portfolio-purple transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
