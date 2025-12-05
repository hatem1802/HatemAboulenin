
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactManager } from "@/components/dashboard/ContactManager";
import { CvManager } from "@/components/dashboard/CvManager";
import { DashboardProjects } from "@/components/dashboard/DashboardProjects";
import { DashboardCategories } from "@/components/dashboard/DashboardCategories";
import { DashboardSkills } from "@/components/dashboard/DashboardSkills";
import { useDashboard } from "@/contexts/DashboardContext";

export const DashboardContent = () => {
  const { activeTab, setActiveTab } = useDashboard();

  return (
    <section className="container mx-auto py-16 max-w-3xl">
      <h2 className="text-3xl font-bold text-portfolio-purple mb-1 text-center">
        Welcome to the Dashboard!
      </h2>
      <p className="mb-8 text-white/80 text-center">
        Add or edit projects, categories, skills, or contact information below .
      </p>
      
      <Tabs 
        defaultValue="projects" 
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as typeof activeTab)}
        className="w-full mb-8"
      >
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-5">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="cv">CV</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="mt-6">
          <DashboardProjects />
        </TabsContent>
        
        <TabsContent value="categories" className="mt-6">
          <DashboardCategories />
        </TabsContent>
        
        <TabsContent value="skills" className="mt-6">
          <DashboardSkills />
        </TabsContent>
        
        <TabsContent value="contact" className="mt-6">
          <div className="grid gap-10">
            <ContactManager />
          </div>
        </TabsContent>
        
        <TabsContent value="cv" className="mt-6">
          <div className="grid gap-10">
            <CvManager />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};
