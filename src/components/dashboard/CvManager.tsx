import { useState, useEffect } from "react";
import { FileText, Upload, Trash, Download, Check } from "lucide-react";
import { CvFile, supabaseApi } from "@/utils/supabaseApi";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export const CvManager = () => {
  const [cvFiles, setCvFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCvFiles();
  }, []);

  const fetchCvFiles = async () => {
    setLoading(true);
    try {
      fetch("https://portfolio-backend-m5ro.onrender.com/api/cv/dashboard")
        .then((res) => res.json())
        .then((data) => setCvFiles(data));
    } catch (error) {
      console.error("Error fetching CV files:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf" && !file.name.endsWith(".docx")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file",
        variant: "destructive",
      });
      return;
    }
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive",
      });
      return;
    }
    const formData = new FormData();
    formData.append("cvFile", file);
    setIsUploading(true);
    
    try {
      console.log(formData)
      const newFile = await axios.post(
        "https://portfolio-backend-production-6392.up.railway.app/api/cv",
        formData
      );

      if (newFile) {
        toast({
          title: "Success",
          description: "CV uploaded successfully",
        });
        fetchCvFiles();
      }
    } catch (error) {
      console.error("Error uploading CV:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your CV",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      e.target.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const deletingFile = axios.delete(`https://portfolio-backend-m5ro.onrender.com/api/cv/${id}`);
      setCvFiles((prev) => prev.filter((file) => file._id !== id));
      toast({
        title: "Success",
        description: "CV deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting CV:", error);
      toast({
        title: "Error",
        description: "Failed to delete CV file",
        variant: "destructive",
      });
    }
  };

  const handleSetActive = async (id: string) => {
    try {
      const editedFile = await axios.put(`https://portfolio-backend-m5ro.onrender.com/api/cv/${id}`, {
        isActive: true,
      });
      // Refresh the list to show updated display status
      fetchCvFiles();
      toast({
        title: "Success",
        description: "CV set as active for display",
      });
    } catch (error) {
      console.error("Error setting active CV:", error);
      toast({
        title: "Error",
        description: "Failed to set active CV",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-portfolio-purple">
          CV / Resume Management
        </h3>

        <div className="relative">
          <input
            type="file"
            id="cv-upload"
            name="cvFile"
            className="hidden"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <label
            htmlFor="cv-upload"
            className={`flex items-center gap-2 bg-portfolio-purple text-white px-3 py-2 rounded cursor-pointer hover:bg-portfolio-purple/90 text-sm ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isUploading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload size={16} />
                Upload CV
              </>
            )}
          </label>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-zinc-800 rounded"></div>
          <div className="h-12 bg-zinc-800 rounded"></div>
        </div>
      ) : cvFiles.length === 0 ? (
        <div className="text-center py-6 text-gray-400">
          <FileText className="mx-auto mb-2" size={32} />
          <p>No CV files uploaded yet</p>
          <p className="text-sm">
            Upload a PDF or DOCX file to display on your homepage
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {cvFiles.map((file) => (
            <li
              key={file._id}
              className={`${
                file.isActive
                  ? "bg-portfolio-purple/20 border border-portfolio-purple"
                  : "bg-zinc-800"
              } 
                p-3 rounded-lg flex justify-between items-center transition-colors`}
            >
              <div className="flex items-center gap-3">
                <FileText
                  className={
                    file.isActive ? "text-portfolio-purple" : "text-gray-400"
                  }
                  size={20}
                />
                <div>
                  <p
                    className={`font-medium ${
                      file.is_Active ? "text-portfolio-purple" : "text-white"
                    }`}
                  >
                    {file.fileName}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${
                    file.isActive
                      ? "text-portfolio-purple bg-portfolio-purple/20"
                      : "text-gray-400 hover:text-portfolio-purple hover:bg-portfolio-purple/10"
                  }`}
                  onClick={() => handleSetActive(file._id)}
                  disabled={file.isActive}
                  title={file.isActive ? "Currently active" : "Set as active"}
                >
                  <Check size={18} />
                </Button>
                <a
                  href={file.cvURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 p-1.5"
                  title="Download"
                >
                  <Download size={18} />
                </a>
                <button
                  onClick={() => handleDelete(file._id)}
                  className="text-red-400 hover:text-red-300 p-1.5"
                  title="Delete"
                >
                  <Trash size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
