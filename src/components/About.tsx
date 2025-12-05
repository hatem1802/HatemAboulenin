import { useState, useEffect } from "react";
import { Code, Server, Palette, Database, Layout } from "lucide-react";
const About = () => {
  const [skills, setSkills] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      setIsLoading(true);
      fetch("https://portfolio-backend-production-6392.up.railway.app/api/skills")
        .then((res) => res.json())
        .then((data) => setSkills(data));
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "code":
        return <Code className="text-portfolio-purple" size={24} />;
      case "server":
        return <Server className="text-portfolio-purple" size={24} />;
      case "palette":
        return <Palette className="text-portfolio-purple" size={24} />;
      case "database":
        return <Database className="text-portfolio-purple" size={24} />;
      case "layout":
        return <Layout className="text-portfolio-purple" size={24} />;
      default:
        return <Server className="text-portfolio-purple" size={24} />;
    }
  };
  return (
    <section id="about" className="bg-zinc-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-24 bg-portfolio-purple mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-portfolio-purple">
              Who I Am
            </h3>
            <p className="text-gray-300 mb-6">
              I'm a passionate full-stack developer with a love for creating
              elegant solutions to complex problems. With several years of
              experience in web development, I enjoy building applications that
              are not only functional but also intuitive and user-friendly.
            </p>
            <p className="text-gray-300 mb-6">
              My journey in programming began when I built my first website in
              college, and since then, I've been continuously learning and
              expanding my skill set. I thrive in collaborative environments and
              believe in writing clean, maintainable code.
            </p>
            <p className="text-gray-300">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open source, or enjoying outdoor activities to
              recharge my creative energy.
            </p>
          </div>

          <div className="bg-zinc-800 p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-white">My Skills</h3>
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-portfolio-purple"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skills.map((skillGroup) => (
                  <div
                    key={skillGroup._id}
                    className="transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="flex items-center mb-3">
                      {getIconComponent(skillGroup.icon)}
                      <h4 className="text-xl font-semibold ml-2">
                        {skillGroup.category}
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {skillGroup.skills.map((skill, skillIndex) => (
                        <li
                          key={skillIndex}
                          className="text-gray-300 flex items-center"
                        >
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-portfolio-purple mr-2"></span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
