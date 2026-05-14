import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { API_URL } from "@/lib/api";

type Project = {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  imageURL?: string;
  image?: string;
  skills?: string[];
  tags?: string[];
  githubURL?: string;
  liveURL?: string;
  category?: string;
  sorting?: number;
  long_description?: string;
  detail_images?: string[];
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // Try direct endpoint first, fall back to list filter
        let data: Project | null = null;
        try {
          const res = await fetch(`${API_URL}/api/projects/${id}`);
          if (res.ok) data = await res.json();
        } catch {
          /* ignore */
        }
        if (!data) {
          const res = await fetch(`${API_URL}/api/projects`);
          const list: Project[] = await res.json();
          data =
            list.find((p) => p._id === id || p.id === id) || null;
        }
        if (!data) setError("Project not found");
        setProject(data);
      } catch (e) {
        console.error(e);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  const cover = project?.imageURL || project?.image;
  const skills = project?.skills || project?.tags || [];
  const gallery = project?.detail_images || [];

  return (
    <div className="min-h-screen bg-portfolio-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-20">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-portfolio-purple transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to projects
        </Link>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="animate-spin text-portfolio-purple" size={40} />
          </div>
        ) : error || !project ? (
          <div className="text-center py-32">
            <p className="text-gray-400 mb-4">{error || "Project not found"}</p>
            <Link to="/">
              <Button variant="secondary">Go home</Button>
            </Link>
          </div>
        ) : (
          <article className="max-w-5xl mx-auto">
            {/* Header */}
            <header className="mb-10">
              {project.category && (
                <Badge
                  variant="outline"
                  className="border-portfolio-purple text-portfolio-purple mb-4"
                >
                  {project.category}
                </Badge>
              )}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-gray-300 max-w-3xl">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                {project.githubURL && (
                  <a
                    href={project.githubURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" className="gap-2">
                      <Github size={18} /> GitHub
                    </Button>
                  </a>
                )}
                {project.liveURL && (
                  <a
                    href={project.liveURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="gap-2 bg-portfolio-purple hover:bg-portfolio-purple/80">
                      <ExternalLink size={18} /> Live demo
                    </Button>
                  </a>
                )}
              </div>
            </header>

            {/* Cover image */}
            {cover && (
              <div className="rounded-xl overflow-hidden border border-zinc-800 mb-12">
                <img
                  src={cover}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Long description */}
            {project.long_description && (
              <section className="prose prose-invert max-w-none mb-12">
                <h2 className="text-2xl font-bold mb-4">About this project</h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {project.long_description}
                </div>
              </section>
            )}

            {/* Tech stack */}
            {skills.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Tech stack</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <span
                      key={i}
                      className="bg-zinc-800 text-sm text-gray-200 px-3 py-1.5 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Long organized gallery */}
            {gallery.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                <div className="flex flex-col gap-6">
                  {gallery.map((src, i) => (
                    <figure
                      key={i}
                      className="rounded-xl overflow-hidden border border-zinc-800"
                    >
                      <img
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        loading="lazy"
                        className="w-full h-auto object-cover"
                      />
                    </figure>
                  ))}
                </div>
              </section>
            )}
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
