import { useState, useEffect } from "react";
import { Github, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch projects and categories from API when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        fetch("https://portfolio-backend-production-6392.up.railway.app/api/projects")
          .then((res) => res.json())
          .then((data) => setProjects(data));
        fetch("https://portfolio-backend-production-6392.up.railway.app/api/categs")
          .then((res) => res.json())
          .then((data) => setCategories(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filter projects based on selected category
  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  // Sort categories alphabetically
  // const sortedCategories = [...categories];

  return (
    <section id="projects" className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="h-1 w-24 bg-portfolio-purple mx-auto rounded-full mb-8"></div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Here are some of my recent projects. Each one was built to solve a
            specific problem or explore new technologies and design patterns.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-portfolio-purple"></div>
          </div>
        ) : (
          <>
            {/* Filter by Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                key="All"
                onClick={() => setActiveCategory("All")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === "All"
                    ? "bg-portfolio-purple text-white"
                    : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                }`}
              >
                All
              </button>

              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setActiveCategory(category.category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.category
                      ? "bg-portfolio-purple text-white"
                      : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>

            {/* Active Filter Display */}
            <div className="flex justify-center items-center gap-2 mb-8">
              <span className="text-gray-400">Active filter:</span>
              {activeCategory !== "All" ? (
                <Badge
                  variant="secondary"
                  className="bg-zinc-800 text-gray-300"
                >
                  {activeCategory} projects
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="bg-zinc-800 text-gray-300"
                >
                  Showing all projects
                </Badge>
              )}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="project-card group border-zinc-800 bg-zinc-900 overflow-hidden"
                  >
                    <div className="relative overflow-hidden h-64">
                      <img
                        src={project.imageURL}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-portfolio-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        {project.githubURL && (
                          <a
                            href={project.githubURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white rounded-full text-portfolio-black hover:bg-portfolio-purple hover:text-white transition-colors"
                          >
                            <Github size={20} />
                          </a>
                        )}
                        {project.liveURL && (
                          <a
                            href={project.liveURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white rounded-full text-portfolio-black hover:bg-portfolio-purple hover:text-white transition-colors"
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-white">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.skills &&
                          project.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-zinc-800 text-xs text-gray-300 px-2 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                      </div>
                      {project.category && (
                        <div className="mt-2">
                          <Badge
                            variant="outline"
                            className="border-portfolio-purple text-portfolio-purple"
                          >
                            {project.category}
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-10">
                  <p className="text-gray-400">
                    No projects found. Try changing your filters.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
