
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface ImageUploadResult {
  success: boolean;
  publicUrl?: string;
  error?: string;
}

export const uploadProfileImage = async (file: File): Promise<ImageUploadResult> => {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return {
        success: false,
        error: "Please upload an image file"
      };
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      return {
        success: false,
        error: "Maximum file size is 2MB"
      };
    }
    
    // Always use the same filename for the profile picture
    const fileName = 'hatem-profile.jpg';
    const filePath = `profile/${fileName}`;
    
    // Remove the old file first to avoid conflicts
    try {
      await supabase.storage
        .from('files')
        .remove([filePath]);
    } catch (err) {
      // Ignore error if file doesn't exist
      console.log("No existing file to remove or error removing:", err);
    }
    
    // Upload new file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type
      });
      
    if (uploadError) {
      throw new Error(uploadError.message);
    }
    
    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('files')
      .getPublicUrl(filePath);
      
    if (!publicUrlData.publicUrl) {
      throw new Error("Failed to get public URL for the file");
    }
    
    // Add cache-busting parameter to force fresh image
    const imageUrlWithTimestamp = `${publicUrlData.publicUrl}?t=${Date.now()}`;
    
    return {
      success: true,
      publicUrl: imageUrlWithTimestamp
    };
  } catch (error: any) {
    console.error("Error uploading profile picture:", error);
    return {
      success: false,
      error: error.message || "There was an error uploading your profile picture"
    };
  }
};

export const deleteProfileImage = async (): Promise<boolean> => {
  try {
    const fileName = 'hatem-profile.jpg';
    const filePath = `profile/${fileName}`;
    
    const { error } = await supabase.storage
      .from('files')
      .remove([filePath]);
      
    if (error) {
      throw new Error(error.message);
    }
    
    return true;
  } catch (error: any) {
    console.error("Error deleting profile picture:", error);
    return false;
  }
};
