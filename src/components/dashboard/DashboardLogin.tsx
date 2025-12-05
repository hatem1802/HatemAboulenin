import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface DashboardLoginProps {
  onLoginSuccess: () => void;
}

export const DashboardLogin = ({ onLoginSuccess }: DashboardLoginProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const fetchResult = await axios.post("https://portfolio-backend-production-6392.up.railway.app/api/login", {
        password: password,
      });

      if (fetchResult) {
        onLoginSuccess();
        setError(null)
      } else {
        toast({
          title: "Error",
          description: "Failed to authenticate. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-[50vh] flex flex-col justify-center items-center">
      <div className="bg-portfolio-black/80 p-8 rounded-lg shadow-lg w-full max-w-md border border-zinc-800">
        <h1 className="text-2xl font-bold mb-6 text-portfolio-purple text-center">
          Dashboard Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter dashboard password"
            className="bg-zinc-900 text-white"
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Enter Dashboard"}
          </Button>
        </form>
      </div>
    </section>
  );
};
