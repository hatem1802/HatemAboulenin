
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Types
export type Project = {
  title: string;
  description: string;
  imageFile: File;
  skills: Array;
  githubURL: string | null;
  liveURL: string | null;
  category: string | null;
  sorting?: string; // Add the sort_order field
};

export type Category = {
  _id: string;
  category: string;
  sorting: number
};

export type Skill = {
  _id: string;
  category: string;
  skills: string[];
  icon: string;
  sorting?: number;
};

export type ContactInfo = {
  _id: string;
  email: string | null;
  phone: string | null;
  location: string | null;
  github: string | null;
  linkedin: string | null;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export type CvFile = {
  id: string;
  filename: string;
  file_url: string;
  uploaded_at: string;
  is_active: boolean;
}

// API functions
export const supabaseApi = {
  // Projects
  getProjects: async (): Promise<Project[]> => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Error fetching projects:", error);
        toast({
          title: "Error",
          description: "Failed to load projects.",
          variant: "destructive",
        });
        return [];
      }

      return data as Project[];
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Error",
        description: "Failed to load projects.",
        variant: "destructive",
      });
      return [];
    }
  },

  addProject: async (project: Omit<Project, "id">): Promise<Project | null> => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .insert([project])
        .select()
        .single();

      if (error) {
        console.error("Error adding project:", error);
        toast({
          title: "Error",
          description: "Failed to add project.",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Success",
        description: "Project added successfully.",
      });

      return data as Project;
    } catch (error) {
      console.error("Error adding project:", error);
      toast({
        title: "Error",
        description: "Failed to add project.",
        variant: "destructive",
      });
      return null;
    }
  },

  updateProject: async (id: string, project: Partial<Project>): Promise<Project | null> => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .update(project)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating project:", error);
        toast({
          title: "Error",
          description: "Failed to update project.",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Success",
        description: "Project updated successfully.",
      });

      return data as Project;
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error",
        description: "Failed to update project.",
        variant: "destructive",
      });
      return null;
    }
  },

  deleteProject: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting project:", error);
        toast({
          title: "Error",
          description: "Failed to delete project.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Project deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete project.",
        variant: "destructive",
      });
    }
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error);
        toast({
          title: "Error",
          description: "Failed to load categories.",
          variant: "destructive",
        });
        return [];
      }

      return data as Category[];
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast({
        title: "Error",
        description: "Failed to load categories.",
        variant: "destructive",
      });
      return [];
    }
  },

  addCategory: async (categoryName: string): Promise<Category | null> => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .insert([{ name: categoryName }])
        .select()
        .single();

      if (error) {
        console.error("Error adding category:", error);
        toast({
          title: "Error",
          description: "Failed to add category.",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Success",
        description: "Category added successfully.",
      });

      return data as Category;
    } catch (error) {
      console.error("Error adding category:", error);
      toast({
        title: "Error",
        description: "Failed to add category.",
        variant: "destructive",
      });
      return null;
    }
  },

  updateCategory: async (id: string, name: string): Promise<Category | null> => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .update({ name })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating category:", error);
        toast({
          title: "Error",
          description: "Failed to update category.",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Success",
        description: "Category updated successfully.",
      });

      return data as Category;
    } catch (error) {
      console.error("Error updating category:", error);
      toast({
        title: "Error",
        description: "Failed to update category.",
        variant: "destructive",
      });
      return null;
    }
  },

  deleteCategory: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting category:", error);
        toast({
          title: "Error",
          description: "Failed to delete category.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Category deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Error",
        description: "Failed to delete category.",
        variant: "destructive",
      });
    }
  },

  // Skills
  getSkills: async (): Promise<Skill[]> => {
    try {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Error fetching skills:", error);
        toast({
          title: "Error",
          description: "Failed to load skills.",
          variant: "destructive",
        });
        return [];
      }

      return data as Skill[];
    } catch (error) {
      console.error("Error fetching skills:", error);
      toast({
        title: "Error",
        description: "Failed to load skills.",
        variant: "destructive",
      });
      return [];
    }
  },

  addSkill: async (skill: Omit<Skill, "id" | "created_at">): Promise<Skill | null> => {
    try {
      const { data, error } = await supabase
        .from("skills")
        .insert([skill])
        .select()
        .single();

      if (error) {
        console.error("Error adding skill:", error);
        toast({
          title: "Error",
          description: "Failed to add skill.",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Success",
        description: "Skill added successfully.",
      });

      return data as Skill;
    } catch (error) {
      console.error("Error adding skill:", error);
      toast({
        title: "Error",
        description: "Failed to add skill.",
        variant: "destructive",
      });
      return null;
    }
  },

  updateSkill: async (id: string, skill: Partial<Omit<Skill, "id" | "created_at">>): Promise<Skill | null> => {
    try {
      const { data, error } = await supabase
        .from("skills")
        .update(skill)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating skill:", error);
        toast({
          title: "Error",
          description: "Failed to update skill.",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Success",
        description: "Skill updated successfully.",
      });

      return data as Skill;
    } catch (error) {
      console.error("Error updating skill:", error);
      toast({
        title: "Error",
        description: "Failed to update skill.",
        variant: "destructive",
      });
      return null;
    }
  },

  deleteSkill: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from("skills")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting skill:", error);
        toast({
          title: "Error",
          description: "Failed to delete skill.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Skill deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting skill:", error);
      toast({
        title: "Error",
        description: "Failed to delete skill.",
        variant: "destructive",
      });
    }
  },

  reorderSkills: async (skillsWithOrder: { id: string; sort_order: number }[]): Promise<void> => {
    try {
      for (const skill of skillsWithOrder) {
        const { error } = await supabase
          .from("skills")
          .update({ sort_order: skill.sort_order })
          .eq("id", skill.id);

        if (error) {
          throw error;
        }
      }

      toast({
        title: "Success",
        description: "Skills reordered successfully.",
      });
    } catch (error) {
      console.error("Error reordering skills:", error);
      toast({
        title: "Error",
        description: "Failed to reorder skills.",
        variant: "destructive",
      });
    }
  },

  // Contact Information
  getContacts: async (): Promise<ContactInfo[]> => {
    try {
      const { data, error } = await supabase
        .from("contact_info")
        .select("*");

      if (error) {
        console.error("Error fetching contact info:", error);
        toast({
          title: "Error",
          description: "Failed to load contact information.",
          variant: "destructive",
        });
        return [];
      }

      return data as ContactInfo[];
    } catch (error) {
      console.error("Error fetching contact info:", error);
      toast({
        title: "Error",
        description: "Failed to load contact information.",
        variant: "destructive",
      });
      return [];
    }
  },

  addContact: async (contactInfo: Omit<ContactInfo, "id">): Promise<ContactInfo | null> => {
    try {
      const { data, error } = await supabase
        .from("contact_info")
        .insert([contactInfo])
        .select()
        .single();

      if (error) {
        console.error("Error adding contact info:", error);
        toast({
          title: "Error",
          description: "Failed to add contact information.",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Success",
        description: "Contact information added successfully.",
      });

      return data as ContactInfo;
    } catch (error) {
      console.error("Error adding contact info:", error);
      toast({
        title: "Error",
        description: "Failed to add contact information.",
        variant: "destructive",
      });
      return null;
    }
  },

  updateContact: async (id: string, contactInfo: Partial<ContactInfo>): Promise<ContactInfo | null> => {
    try {
      console.log("Updating contact with ID:", id, "and data:", contactInfo);
      
      const { data, error } = await supabase
        .from("contact_info")
        .update(contactInfo)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating contact info:", error);
        toast({
          title: "Error",
          description: "Failed to update contact information.",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Success",
        description: "Contact information updated successfully.",
      });

      return data as ContactInfo;
    } catch (error) {
      console.error("Error updating contact info:", error);
      toast({
        title: "Error",
        description: "Failed to update contact information.",
        variant: "destructive",
      });
      return null;
    }
  },
  
  // CV Files
  getCvFiles: async (): Promise<CvFile[]> => {
    try {
      const { data, error } = await supabase
        .from("cv_files")
        .select("*")
        .order("uploaded_at", { ascending: false });

      if (error) {
        console.error("Error fetching CV files:", error);
        toast({
          title: "Error",
          description: "Failed to load CV files.",
          variant: "destructive",
        });
        return [];
      }

      return data as CvFile[];
    } catch (error) {
      console.error("Error fetching CV files:", error);
      toast({
        title: "Error",
        description: "Failed to load CV files.",
        variant: "destructive",
      });
      return [];
    }
  },

  getActiveCv: async (): Promise<CvFile | null> => {
    try {
      const { data, error } = await supabase
        .from("cv_files")
        .select("*")
        .eq("is_active", true)
        .maybeSingle();

      if (error) {
        console.error("Error fetching active CV:", error);
        return null;
      }

      return data as CvFile;
    } catch (error) {
      console.error("Error fetching active CV:", error);
      return null;
    }
  },
  
  setActiveCv: async (id: string): Promise<boolean> => {
    try {
      // First, set all CVs as inactive
      const { error: resetError } = await supabase
        .from("cv_files")
        .update({ is_active: false })
        .neq("id", "none"); // This will update all rows
      
      if (resetError) {
        console.error("Error resetting active CV status:", resetError);
        return false;
      }
      
      // Then set the selected CV as active
      const { error: updateError } = await supabase
        .from("cv_files")
        .update({ is_active: true })
        .eq("id", id);
        
      if (updateError) {
        console.error("Error setting active CV:", updateError);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error in setActiveCv:", error);
      return false;
    }
  },
  
  uploadCv: async (file: File): Promise<CvFile | null> => {
    try {
      // Generate a unique filename
      const timestamp = new Date().getTime();
      const fileExt = file.name.split('.').pop();
      const fileName = `cv-${timestamp}.${fileExt}`;
      const filePath = `cv/${fileName}`;
      
      console.log("Uploading file to storage:", filePath);
      
      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('files')
        .upload(filePath, file);
        
      if (uploadError) {
        console.error("Error uploading CV file to storage:", uploadError);
        toast({
          title: "Error",
          description: "Failed to upload CV file to storage.",
          variant: "destructive",
        });
        return null;
      }
      
      console.log("Upload successful:", uploadData);
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('files')
        .getPublicUrl(filePath);
        
      if (!publicUrlData.publicUrl) {
        console.error("Failed to get public URL for the file");
        toast({
          title: "Error",
          description: "Failed to get public URL for the file.",
          variant: "destructive",
        });
        return null;
      }
      
      console.log("Public URL generated:", publicUrlData.publicUrl);
      
      // Save the file info to the database
      const { data: fileData, error: fileError } = await supabase
        .from("cv_files")
        .insert([{
          filename: file.name,
          file_url: publicUrlData.publicUrl,
          is_active: false // By default, new uploads are not active
        }])
        .select()
        .single();
        
      if (fileError) {
        console.error("Error saving CV file info to database:", fileError);
        toast({
          title: "Error",
          description: "Failed to save CV file information in database.",
          variant: "destructive",
        });
        return null;
      }
      
      console.log("CV file data saved to database:", fileData);
      
      return fileData as CvFile;
    } catch (error) {
      console.error("Error in CV upload process:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during CV upload.",
        variant: "destructive",
      });
      return null;
    }
  },
  
  deleteCv: async (id: string): Promise<void> => {
    try {
      // Get the file URL first to remove it from storage
      const { data: fileData, error: fetchError } = await supabase
        .from("cv_files")
        .select("file_url")
        .eq("id", id)
        .single();
        
      if (fetchError) {
        console.error("Error fetching CV file for deletion:", fetchError);
        toast({
          title: "Error",
          description: "Failed to fetch CV file for deletion.",
          variant: "destructive",
        });
        return;
      }
      
      // Extract path from the URL
      const url = new URL(fileData.file_url);
      const pathParts = url.pathname.split('/');
      const filePath = pathParts.slice(-2).join('/');
      
      console.log("Deleting file from storage:", filePath);
      
      // Delete from storage
      if (filePath) {
        const { error: storageError } = await supabase.storage
          .from('files')
          .remove([filePath]);
          
        if (storageError) {
          console.error("Error deleting CV file from storage:", storageError);
          // Continue anyway to delete the database record
        }
      }
      
      // Delete from database
      const { error } = await supabase
        .from("cv_files")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting CV file record:", error);
        toast({
          title: "Error",
          description: "Failed to delete CV file record.",
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      console.error("Error deleting CV file:", error);
      toast({
        title: "Error",
        description: "Failed to delete CV file.",
        variant: "destructive",
      });
    }
  },

  // Dashboard authentication
  verifyDashboardPassword: async (password: string): Promise<boolean> => {
    try {
      console.log("Fetching dashboard settings...");
      const { data, error } = await supabase
        .from("dashboard_settings")
        .select("id")
        .limit(1)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching dashboard settings:", error);
        return false;
      }

      if (!data) {
        console.error("No dashboard settings found");
        return false;
      }
      
      console.log("Found settings ID:", data.id);
      
      // Use the Supabase edge function to verify the password
      const { data: verifyResult, error: verifyError } = await supabase.functions.invoke(
        'verify-dashboard-password',
        {
          body: JSON.stringify({ 
            password, 
            settingsId: data.id 
          })
        }
      );
      
      if (verifyError) {
        console.error("Error verifying password:", verifyError);
        return false;
      }
      
      console.log("Verification result:", verifyResult);
      
      return verifyResult?.success ?? false;
    } catch (error) {
      console.error("Error verifying dashboard password:", error);
      return false;
    }
  },
  
  // Upload a new profile picture
  uploadProfilePicture: async (file: File): Promise<string | null> => {
    try {
      // Generate a unique filename
      const timestamp = new Date().getTime();
      const fileExt = file.name.split('.').pop();
      const fileName = `profile-${timestamp}.${fileExt}`;
      const filePath = `profile/${fileName}`;
      
      console.log("Uploading profile picture to storage:", filePath);
      
      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('files')
        .upload(filePath, file);
        
      if (uploadError) {
        console.error("Error uploading profile picture to storage:", uploadError);
        toast({
          title: "Error",
          description: "Failed to upload profile picture to storage.",
          variant: "destructive",
        });
        return null;
      }
      
      console.log("Upload successful:", uploadData);
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('files')
        .getPublicUrl(filePath);
        
      if (!publicUrlData.publicUrl) {
        console.error("Failed to get public URL for the file");
        toast({
          title: "Error",
          description: "Failed to get public URL for the profile picture.",
          variant: "destructive",
        });
        return null;
      }
      
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Error in profile picture upload process:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during profile picture upload.",
        variant: "destructive",
      });
      return null;
    }
  }
};
