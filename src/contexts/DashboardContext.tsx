
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { supabaseApi, ContactInfo } from "@/utils/supabaseApi";
import { useToast } from "@/hooks/use-toast";

type DashboardTab = "projects" | "categories" | "skills" | "contact" | "cv";

interface DashboardContextProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  contacts: ContactInfo[];
  refreshContacts: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>("projects");
  const [contacts, setContacts] = useState<ContactInfo[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    refreshContacts();
  }, []);

  const refreshContacts = async () => {
    try {
      // const fetchedContacts = await supabaseApi.getContacts();          
      // setContacts(fetchedContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast({
        title: "Error",
        description: "Failed to load contact data.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardContext.Provider value={{ 
      activeTab, 
      setActiveTab,
      contacts,
      refreshContacts
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
