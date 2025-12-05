
/**
 * Portfolio Dashboard API Utilities
 * 
 * This file simulates a backend API using localStorage
 */

import { toast } from "@/components/ui/use-toast";

// Types
export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  category: string;
};

export type Category = {
  id: number;
  name: string;
};

// LocalStorage keys
const PROJECTS_KEY = "portfolio_dashboard_projects";
const CATEGORIES_KEY = "portfolio_dashboard_categories";

// Default categories if none exist in storage
const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: "Frontend" },
  { id: 2, name: "Backend" },
  { id: 3, name: "Full Stack" },
  { id: 4, name: "Mobile" },
];

// API functions
export const api = {
  // Projects
  getProjects: (): Project[] => {
    try {
      const projects = localStorage.getItem(PROJECTS_KEY);
      return projects ? JSON.parse(projects) : [];
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

  addProject: (project: Omit<Project, "id">): Project => {
    try {
      const projects = api.getProjects();
      const newProject = {
        ...project,
        id: Date.now(),
      };
      
      localStorage.setItem(PROJECTS_KEY, JSON.stringify([newProject, ...projects]));
      
      toast({
        title: "Success",
        description: "Project added successfully.",
      });
      
      return newProject;
    } catch (error) {
      console.error("Error adding project:", error);
      toast({
        title: "Error",
        description: "Failed to add project.",
        variant: "destructive",
      });
      throw error;
    }
  },

  deleteProject: (id: number): void => {
    try {
      const projects = api.getProjects();
      const filteredProjects = projects.filter(project => project.id !== id);
      
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(filteredProjects));
      
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
  getCategories: (): Category[] => {
    try {
      const categories = localStorage.getItem(CATEGORIES_KEY);
      const loadedCategories = categories ? JSON.parse(categories) : DEFAULT_CATEGORIES;
      
      // If no categories have been saved yet, save the defaults
      if (!categories) {
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
      }
      
      return loadedCategories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast({
        title: "Error",
        description: "Failed to load categories.",
        variant: "destructive",
      });
      return DEFAULT_CATEGORIES;
    }
  },

  addCategory: (categoryName: string): Category => {
    try {
      const categories = api.getCategories();
      const newCategory = {
        id: Date.now(),
        name: categoryName,
      };
      
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify([newCategory, ...categories]));
      
      toast({
        title: "Success",
        description: "Category added successfully.",
      });
      
      return newCategory;
    } catch (error) {
      console.error("Error adding category:", error);
      toast({
        title: "Error",
        description: "Failed to add category.",
        variant: "destructive",
      });
      throw error;
    }
  },

  deleteCategory: (id: number): void => {
    try {
      const categories = api.getCategories();
      const filteredCategories = categories.filter(category => category.id !== id);
      
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(filteredCategories));
      
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
};
