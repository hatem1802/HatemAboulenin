
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ContactInfo } from "@/utils/supabaseApi";

interface EditContactFormProps {
  contact: ContactInfo;
  onSave: (id: string, updatedContact: Partial<ContactInfo>) => void;
  onCancel: () => void;
}

export const EditContactForm = ({ contact, onSave, onCancel }: EditContactFormProps) => {
  const [email, setEmail] = useState(contact.email || '');
  const [phone, setPhone] = useState(contact.phone || '');
  const [location, setLocation] = useState(contact.location || '');
  const [github, setGithub] = useState(contact.github || '');
  const [linkedin, setLinkedin] = useState(contact.linkedin || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
        
    onSave(contact._id, {
      email,
      phone,
      location,
      github,
      linkedin
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900/90 rounded-lg p-4 space-y-3 border border-zinc-700">
      <h4 className="text-sm font-medium text-white mb-2">Edit Contact Information</h4>
      
      <div>
        <Label htmlFor="edit-email">Email</Label>
        <Input
          id="edit-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
        />
      </div>

      <div>
        <Label htmlFor="edit-phone">Phone</Label>
        <Input
          id="edit-phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 (234) 567-890"
        />
      </div>

      <div>
        <Label htmlFor="edit-location">Location</Label>
        <Input
          id="edit-location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="San Francisco, CA"
        />
      </div>

      <div>
        <Label htmlFor="edit-github">GitHub URL</Label>
        <Input
          id="edit-github"
          type="url"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          placeholder="https://github.com/yourusername"
        />
      </div>

      <div>
        <Label htmlFor="edit-linkedin">LinkedIn URL</Label>
        <Input
          id="edit-linkedin"
          type="url"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          placeholder="https://linkedin.com/in/yourusername"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} size="sm">
          Cancel
        </Button>
        <Button type="submit" size="sm">
          Save Changes
        </Button>
      </div>
    </form>
  );
};
