import { useState, useEffect } from "react";
import { Skill } from "@/utils/supabaseApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Code,
  Palette,
  Database,
  Layout,
  Server,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { EditSkillForm } from "./EditSkillForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export const DashboardSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSkillCategory, setNewSkillCategory] = useState("");
  const [newSkillItems, setNewSkillItems] = useState("");
  const [newSkillIcon, setNewSkillIcon] = useState("code");
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const { toast } = useToast();

  const fetchSkills = async () => {
    try {
      setLoading(true);
      fetch("https://portfolio-backend-m5ro.onrender.com/api/skills")
        .then((res) => res.json())
        .then((data) => setSkills(data));
      // setSkills(fetchedSkills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      toast({
        title: "Error",
        description: "Failed to load skills data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "code":
        return <Code size={20} />;
      case "palette":
        return <Palette size={20} />;
      case "database":
        return <Database size={20} />;
      case "layout":
        return <Layout size={20} />;
      case "server":
        return <Server size={20} />;
      default:
        return <Code size={20} />;
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillCategory.trim() || !newSkillItems.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const skillItemsArray = newSkillItems.split(",").map((item) => item.trim());

    try {
      const obj = {
        category: newSkillCategory,
        skills: skillItemsArray,
        icon: newSkillIcon,
        sorting: skills.length + 1,
      };
      const addSkills = await axios.post(
        "https://portfolio-backend-m5ro.onrender.com/api/skills",
        obj
      );
      // Reset form
      setNewSkillCategory("");
      setNewSkillItems("");
      setNewSkillIcon("code");
      // display new skill
      fetchSkills();
    } catch (error) {
      console.error("Error adding skill:", error);
      toast({
        title: "Error",
        description: "Failed to add skill.",
        variant: "destructive",
      });
    }
  };

  const handleSaveSkill = async (id: string, updatedSkill: Skill) => {
    try {
      const editingSkill = await axios.put(
        `https://portfolio-backend-m5ro.onrender.com/api/skills/${id}`,
        updatedSkill
      );
      setEditingSkill(undefined);
      fetchSkills();
    } catch (error) {
      console.error("Error updating skill:", error);
      toast({
        title: "Error",
        description: "Failed to update skill.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSkill = async (skill) => {
    const id = skill._id;
    try {
      const deletedSkills = await axios.delete(
        `https://portfolio-backend-m5ro.onrender.com/api/skills/${id}`
      );

      setSkills(skills.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Error deleting skill:", error);
      toast({
        title: "Error",
        description: "Failed to delete skill.",
        variant: "destructive",
      });
    }
  };

  const handleMoveSkill = async (skill, direction: "up" | "down") => {
    let newSorting;
    if (direction === "up") {
      newSorting = {
        sorting: skill.sorting - 1,
      };
    } else if (direction === "down") {
      newSorting = {
        sorting: skill.sorting + 1,
      };
    }

    try {
      const savedSkill = await axios.put(
        `https://portfolio-backend-m5ro.onrender.com/api/skills/${skill._id}`,
        newSorting
      );
      fetchSkills();
    } catch (error) {
      console.error("Error reordering skills:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-portfolio-purple"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border border-zinc-700 bg-zinc-900/60">
        <CardHeader>
          <CardTitle>Add New Skill Category</CardTitle>
          <CardDescription>
            Create a new skill category with related skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddSkill} className="space-y-4">
            <div>
              <Label htmlFor="category">Skill Category</Label>
              <Input
                id="category"
                placeholder="e.g., Frontend, Backend, Design"
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input
                id="skills"
                placeholder="e.g., React, TypeScript, Node.js"
                value={newSkillItems}
                onChange={(e) => setNewSkillItems(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="icon">Icon</Label>
              <select
                id="icon"
                value={newSkillIcon}
                onChange={(e) => setNewSkillIcon(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md text-white p-2"
              >
                <option value="code">Code</option>
                <option value="server">Server</option>
                <option value="palette">Palette</option>
                <option value="database">Database</option>
                <option value="layout">Layout</option>
              </select>
            </div>
            <Button type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Skill Category
            </Button>
          </form>
        </CardContent>
      </Card>

      {skills.length === 0 ? (
        <Card className="border border-zinc-700 bg-zinc-900/60">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-zinc-500 mb-4" />
            <p className="text-zinc-300">
              No skills found. Add your first skill category above.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <Card
              key={skill._id}
              className="border border-zinc-700 bg-zinc-900/60"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="bg-zinc-800 p-2 rounded-md">
                      {getIconComponent(skill.icon)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {skill.category}
                      </CardTitle>
                      <p className="text-sm text-zinc-400">
                        Order: {skill.sorting}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMoveSkill(skill, "up")}
                      disabled={skill.sorting === 1}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMoveSkill(skill, "down")}
                      disabled={index === skills.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingSkill(skill)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteSkill(skill)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skill.skills.map((item, index) => (
                    <span
                      key={index}
                      className="bg-zinc-800 text-zinc-100 text-xs px-2 py-1 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Skill Modal */}
      {editingSkill && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md">
            <EditSkillForm
              skill={editingSkill}
              onSave={handleSaveSkill}
              onCancel={() => setEditingSkill(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
