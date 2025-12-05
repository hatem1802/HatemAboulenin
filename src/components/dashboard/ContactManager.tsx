import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Edit } from "lucide-react";
import { ContactInfo } from "@/utils/supabaseApi";
import { EditContactForm } from "./EditContactForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export const ContactManager = () => {
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
  });
  const [editingContact, setEditingContact] = useState(null);
  const { toast } = useToast();

  const fetchContact = async () => {
    fetch("https://portfolio-backend-production-6392.up.railway.app/api/contacts")
      .then((res) => res.json())
      .then(data => setContact(data))
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const handleSaveContact = async (
    id: string,
    updatedContact: Partial<ContactInfo>
  ) => {
    try {
      const editContact = await axios.put(
        `https://portfolio-backend-production-6392.up.railway.app/api/contacts/${id}`,
        updatedContact
      );

      setEditingContact(null);
      fetchContact();
      toast({
        title: "Success",
        description: "Contact information updated successfully.",
      });
    } catch (error) {
      console.error("Error updating contact:", error);
      toast({
        title: "Error",
        description: "Failed to update contact information.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-portfolio-purple">
          Contact Information
        </h3>
        <Button
          onClick={() => setEditingContact(contact)}
          variant="outline"
          size="sm"
          className="text-blue-400 hover:text-blue-300"
        >
          <Edit size={16} className="mr-2" /> Edit
        </Button>
      </div>

      {!editingContact ? (
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="bg-zinc-800 p-3 rounded-lg mr-4">
              <Mail className="text-portfolio-purple" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-white">Email</h4>
              <p className="text-gray-400">{contact.email || "Not set"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-zinc-800 p-3 rounded-lg mr-4">
              <Phone className="text-portfolio-purple" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-white">Phone</h4>
              <p className="text-gray-400">{contact.phone || "Not set"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-zinc-800 p-3 rounded-lg mr-4">
              <MapPin className="text-portfolio-purple" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-white">Location</h4>
              <p className="text-gray-400">{contact.location || "Not set"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-zinc-800 p-3 rounded-lg mr-4">
              <Github className="text-portfolio-purple" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-white">GitHub</h4>
              <p className="text-gray-400">{contact.github || "Not set"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-zinc-800 p-3 rounded-lg mr-4">
              <Linkedin className="text-portfolio-purple" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-white">LinkedIn</h4>
              <p className="text-gray-400">{contact.linkedin || "Not set"}</p>
            </div>
          </div>
        </div>
      ) : (
        <EditContactForm
          contact={editingContact}
          onSave={handleSaveContact}
          onCancel={() => setEditingContact(null)}
        />
      )}
    </div>
  );
};
