
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleSectionHighlight = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSectionId = '#home';

      sections.forEach((section) => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.clientHeight;

        if (
          window.scrollY >= sectionTop - 200 &&
          window.scrollY < sectionTop + sectionHeight - 200
        ) {
          currentSectionId = `#${sectionElement.getAttribute('id')}`;
        }
      });

      setActiveSection(currentSectionId);
    };

    window.addEventListener('scroll', handleSectionHighlight);
    handleSectionHighlight();

    return () => {
      window.removeEventListener('scroll', handleSectionHighlight);
    };
  }, []);

  const handleNavClick = (event: React.MouseEvent, href: string) => {
    event.preventDefault();

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',  // Add smooth scrolling behavior
        block: 'start'       // Align to the top of the viewport
      });
      setActiveSection(href);
    }

    setIsOpen(false);
  };

  const navLinks = [
    { title: 'Home', href: '#home' },
    { title: 'About', href: '#about' },
    { title: 'Projects', href: '#projects' },
    { title: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-portfolio-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          <span className="text-portfolio-purple">Hatem</span>Portfolio
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className={`
                nav-link 
                hover:text-portfolio-purple 
                font-medium 
                ${activeSection === link.href 
                  ? 'text-portfolio-purple font-bold' 
                  : 'text-white/80'}
              `}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.title}
            </a>
          ))}
          <a
            href="#contact"
            className="button-primary"
            onClick={(e) => handleNavClick(e, "#contact")}
          >
            Let's Talk
          </a>
          {/* Removed Dashboard link */}
        </nav>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-portfolio-black/95 backdrop-blur-md animate-fade-in">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className={`
                  hover:text-portfolio-purple 
                  font-medium 
                  py-2 
                  ${activeSection === link.href 
                    ? 'text-portfolio-purple font-bold' 
                    : 'text-white/80'}
                `}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.title}
              </a>
            ))}
            <a
              href="#contact"
              className="button-primary inline-block text-center"
              onClick={(e) => handleNavClick(e, "#contact")}
            >
              Let's Talk
            </a>
            {/* Removed Dashboard link from mobile menu */}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
