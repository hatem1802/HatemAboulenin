import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Hero = () => {
  const [activeProfile, setActiveProfile] = useState(null);
  const [activeCv, setActiveCv] = useState(null);
  const [Linkedin, setLinkedIn] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch('https://portfolio-backend-production-6392.up.railway.app/api/cv/home')
          .then(res => res.json())
          .then(data => setActiveCv(data));
        fetch('https://portfolio-backend-production-6392.up.railway.app/images/profile')
          .then(res => res.json())
          .then(data => setActiveProfile(data));
        fetch('https://portfolio-backend-production-6392.up.railway.app/api/contacts')
          .then(res => res.json())
          .then(data => setLinkedIn(data.linkedin));
      } catch (error) {
        console.error('Error fetching active CV:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-portfolio-purple/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-portfolio-purple/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto z-10">
        <div className="max-w-3xl flex flex-col items-center md:items-start">
          {/* Profile Picture */}
          <Avatar className="w-48 h-48 mb-6 border-4 border-portfolio-purple">
              <AvatarImage 
                src={activeProfile && (activeProfile.imageURL)}
                alt="Profile Picture" 
                className="object-cover"
              />
              <AvatarFallback>HD</AvatarFallback>
          </Avatar>
          <p className="text-portfolio-purple font-medium mb-4 animate-fade-in">Hello, I'm</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in text-center md:text-left">
            <span className="text-white">Hatem Aboulenin</span>
            <br />
            <span className="text-portfolio-purple">Web Developer</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl animate-fade-in text-center md:text-left" style={{ animationDelay: '0.2s' }}>
            I build stunning web applications with modern technologies. 
            I specialize in creating responsive and performant user experiences 
            that solve real-world problems.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in justify-center md:justify-start" style={{ animationDelay: '0.4s' }}>
            <a href={activeCv && (activeCv.cvURL)} target="_blank" className="button-primary" rel="noopener noreferrer">
              View my CV
            </a>

            <a href={Linkedin && Linkedin} target="_blank" className="button-outline" rel="noopener noreferrer">
              My Linkedin
            </a>
          </div>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce-light"
        aria-label="Scroll down"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
};

export default Hero;
