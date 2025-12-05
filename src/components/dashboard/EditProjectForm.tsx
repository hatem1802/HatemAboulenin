import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Project, Category } from "@/utils/supabaseApi";

interface EditProjectFormProps {
  project;
  categories: Category[];
  onSave: (id: string, updatedProject) => void;
  onCancel: () => void;
}

export const EditProjectForm = ({
  project,
  categories,
  onSave,
  onCancel,
}: EditProjectFormProps) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [imageURL, setImage] = useState(project.imageURL || "");
  const [skills, setSkills] = useState(
    project.skills ? project.skills.join(", ") : ""
  );
  const [githubURL, setGithub] = useState(project.githubURL || "");
  const [liveURL, setDemo] = useState(project.liveURL || "");
  const [category, setCategory] = useState(project.category || "");
  const [sorting, setSorting] = useState(project.sorting || "999");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave(project._id, {
      title,
      description,
      imageURL: imageURL || null,
      skills: skills.split(",").map((s) => s.trim()),
      githubURL: githubURL || null,
      liveURL: liveURL || null,
      category: category || null,
      sorting: sorting,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900/90 rounded-lg p-4 space-y-3 border border-zinc-700"
    >
      <h4 className="text-sm font-medium text-white mb-2">Edit Project</h4>
      <div>
        <Label htmlFor="edit-title">Title</Label>
        <Input
          id="edit-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="edit-description">Description</Label>
        <Input
          id="edit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="edit-image">Image URL</Label>
        <Input
          id="edit-image"
          value={imageURL}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="edit-tags">Tags (comma separated)</Label>
        <Input
          id="edit-tags"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="edit-github">GitHub URL</Label>
        <Input
          id="edit-github"
          value={githubURL}
          onChange={(e) => setGithub(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="edit-demo">Demo URL</Label>
        <Input
          id="edit-demo"
          value={liveURL}
          onChange={(e) => setDemo(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="edit-category">Category</Label>
        <select
          id="edit-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-md text-white p-2"
        >
          <option value="">No Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="edit-sortOrder">
          Display Order (lower numbers appear first)
        </Label>
        <Input
          id="edit-sortOrder"
          type="number"
          min="1"
          value={sorting}
          onChange={(e) => setSorting(e.target.value)}
          className="mt-1"
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
