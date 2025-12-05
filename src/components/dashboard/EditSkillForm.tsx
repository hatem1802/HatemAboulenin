
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Code, Palette, Database, Layout, Server } from "lucide-react";
import { Skill } from "@/utils/supabaseApi";

interface EditSkillFormProps {
  skill: Skill;
  onSave: (id: string, updatedSkill: Partial<Skill>) => void;
  onCancel: () => void;
}

export const EditSkillForm = ({ skill, onSave, onCancel }: EditSkillFormProps) => {
  const [category, setCategory] = useState(skill.category);
  const [skills, setItems] = useState(skill.skills.join(", "));
  const [icon, setIcon] = useState(skill.icon);

  const icons = [
    { value: "code", label: "Code" },
    { value: "server", label: "Server" },
    { value: "palette", label: "Palette" },
    { value: "database", label: "Database" },
    { value: "layout", label: "Layout" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave(skill._id, {
      category,
      skills: skills.split(","),
      icon
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900/90 rounded-lg p-4 space-y-3 border border-zinc-700">
      <h4 className="text-sm font-medium text-white mb-2">Edit Skill</h4>
      <div>
        <Label htmlFor="edit-skill-category">Skill Category</Label>
        <Input
          id="edit-skill-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="edit-skill-items">Skills (comma separated)</Label>
        <Input
          id="edit-skill-items"
          value={skills}
          onChange={(e) => setItems(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="edit-skill-icon">Icon</Label>
        <select
          id="edit-skill-icon"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-md text-white p-2"
        >
          {icons.map((iconOption) => (
            <option key={iconOption.value} value={iconOption.value}>
              {iconOption.label}
            </option>
          ))}
        </select>
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
