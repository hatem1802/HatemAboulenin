import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";

const Contact = () => {
  const [isloading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contacts, setContacts] = useState({
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  });

  useEffect(() => {
    const fetchContacts = () => {
      setIsLoading(true);
      try {
        fetch("https://portfolio-backend-production-6392.up.railway.app/api/contacts")
          .then((res) => res.json())
          .then((data) => setContacts(data));
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContacts();
  }, []);

  return (
    <section id="contact" className="bg-zinc-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="h-1 w-24 bg-portfolio-purple mx-auto rounded-full mb-8"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            I'm currently available for freelance work or full-time positions.
            If you have a project that needs coding or just want to chat, feel
            free to contact me.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-portfolio-purple">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-zinc-800 p-3 rounded-lg mr-4">
                  <Mail className="text-portfolio-purple" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <a
                    href={`mailto:${contacts.email}`}
                    className="text-gray-400 hover:text-portfolio-purple transition-colors"
                  >
                    {contacts.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-zinc-800 p-3 rounded-lg mr-4">
                  <Phone className="text-portfolio-purple" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Phone</h4>
                  <a
                    href={"tel:+" + contacts.phone}
                    className="text-gray-400 hover:text-portfolio-purple transition-colors"
                  >
                    {contacts.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-zinc-800 p-3 rounded-lg mr-4">
                  <MapPin className="text-portfolio-purple" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Location</h4>
                  <p className="text-gray-400">{contacts.location}</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="font-semibold text-white mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                <a
                  href={contacts.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-800 p-3 rounded-lg text-white hover:bg-portfolio-purple transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href={contacts.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-800 p-3 rounded-lg text-white hover:bg-portfolio-purple transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-800 p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Send a Message
            </h3>

            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-lg px-4 py-3 focus:outline-none focus:border-portfolio-purple"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-lg px-4 py-3 focus:outline-none focus:border-portfolio-purple"
                  placeholder="Your email"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-lg px-4 py-3 focus:outline-none focus:border-portfolio-purple"
                  placeholder="Your message"
                />
              </div>

              <button
                type="submit"
                className="button-primary w-full flex items-center justify-center"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send size={16} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
