import { useState, useEffect } from "react";
import { Tag, Plus, Trash, Edit, SortAsc, SortDesc } from "lucide-react";
import { supabaseApi, Category } from "@/utils/supabaseApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { EditCategoryForm } from "@/components/dashboard/EditCategoryForm";
import axios from "axios";


// Add Category Form Component
function AddCategoryForm({ onAdd }: { onAdd: (name: string) => void }) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name);
    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900/90 rounded-lg p-6 mb-6 space-y-4 border border-primary"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2 text-primary mb-2">
        <Tag size={18} /> Add New Category
      </h3>
      <div>
        <Label htmlFor="category-name">Category Name</Label>
        <Input
          id="category-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1"
          placeholder="e.g. Frontend"
        />
      </div>
      <Button
        type="submit"
        className="mt-3 bg-primary text-white hover:bg-primary/80"
      >
        <Plus size={16} /> Add Category
      </Button>
    </form>
  );
}

// Category Item Component
function CategoryItem({
  category,
  onDelete,
  onEdit,
}: {
  category: Category;
  onDelete: (id: string) => void;
  onEdit: (category: Category) => void;
}) {
  return (
    <li
      key={category._id}
      className="bg-portfolio-purple/50 px-3 py-1 rounded text-white text-xs flex items-center gap-2"
    >
      {category.category}
      <div className="flex space-x-1">
        <button
          type="button"
          className="hover:text-blue-400 transition-colors p-1"
          aria-label={`Edit ${category.category}`}
          onClick={() => onEdit(category)}
        >
          <Edit size={14} />
        </button>
        <button
          type="button"
          className="hover:text-red-400 transition-colors p-1"
          aria-label={`Delete ${category.category}`}
          onClick={() => onDelete(category._id)}
        >
          <Trash size={14} />
        </button>
      </div>
    </li>
  );
}

// Main Dashboard Categories Component
export const DashboardCategories = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Load categories
  const fetchCategories = async () => {
    try {
      fetch("https://portfolio-backend-m5ro.onrender.com/api/categs")
        .then((res) => res.json())
        .then((data) => setCategories(data));
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast({
        title: "Error",
        description: "Failed to load categories.",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    fetchCategories();
  }, [toast]);

  // Handle adding a new category
  const handleAddCategory = async (name: string) => {
    try {
      const obj = {
        category: name,
        sorting: categories.length + 1,
      };
      const newCategory = await axios.post(
        "https://portfolio-backend-m5ro.onrender.com/api/categs",
        obj
      );
      if (newCategory) {
        fetchCategories();
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Handle saving an edited category
  const handleSaveCategory = async (id: string, name: string) => {
    try {
      const obj = {
        category: name
      }
      const updated = await axios.put(`https://portfolio-backend-m5ro.onrender.com/api/categs/${id}`,obj)
      if (updated) {
        fetchCategories();
      }
      setEditingCategory(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (id: string) => {
    try {
      const deleteCategory = axios.delete(`https://portfolio-backend-m5ro.onrender.com/api/categs/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="grid gap-10">
      <AddCategoryForm onAdd={handleAddCategory} />

      <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-primary">Categories</h3>

          <div className="flex items-center gap-4">
            <Badge
              variant="outline"
              className="border-portfolio-purple text-portfolio-purple"
            >
              {categories.length}{" "}
              {categories.length === 1 ? "category" : "categories"}
            </Badge>
          </div>
        </div>

        {categories.length === 0 ? (
          <p className="text-sm text-gray-400">No categories added yet.</p>
        ) : (
          <ul className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <CategoryItem
                category={cat}
                onDelete={handleDeleteCategory}
                onEdit={() => setEditingCategory(cat)}
              />
            ))}
          </ul>
        )}
      </div>
        
      {/* Category Edit Dialog */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md">
            <EditCategoryForm
              category={editingCategory}
              onSave={handleSaveCategory}
              onCancel={() => setEditingCategory(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
