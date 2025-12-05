
import { useState } from "react";
import { DashboardLogin } from "@/components/dashboard/DashboardLogin";
import { DashboardLoading } from "@/components/dashboard/DashboardLoading";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { DashboardProvider } from "@/contexts/DashboardContext";

// Main Dashboard Component
const Dashboard = () => {
  const [step, setStep] = useState<"login" | "loading" | "dashboard">("login");

  const handleLoginSuccess = () => {
    setStep("loading");
    // Simulate a brief loading state before showing the dashboard
    setTimeout(() => {
      setStep("dashboard");
    }, 0);
  };

  if (step === "login") {
    return <DashboardLogin onLoginSuccess={handleLoginSuccess} />;
  }

  if (step === "loading") {
    return <DashboardLoading />;
  }

  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default Dashboard;
