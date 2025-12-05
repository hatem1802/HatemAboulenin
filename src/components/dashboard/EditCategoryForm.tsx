import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Category } from "@/utils/supabaseApi";

interface EditCategoryFormProps {
  category: Category;
  onSave: (id: string, name: string) => void;
  onCancel: () => void;
}

export const EditCategoryForm = ({
  category,
  onSave,
  onCancel,
}: EditCategoryFormProps) => {
  const [name, setName] = useState(category.category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(category._id, name);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900/90 rounded-lg p-4 space-y-3 border border-zinc-700"
    >
      <h4 className="text-sm font-medium text-white mb-2">Edit Category</h4>
      <div>
        <Label htmlFor="edit-category-name">Category Name</Label>
        <Input
          id="edit-category-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
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
