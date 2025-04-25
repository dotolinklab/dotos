
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useSupabaseStorage = (bucketName: string) => {
  const uploadFile = async (file: File) => {
    if (!file.type.includes('image/')) {
      toast.error('이미지 파일만 업로드할 수 있습니다.');
      return null;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('이미지 업로드 중 오류가 발생했습니다.');
      return null;
    }
  };

  return { uploadFile };
};
