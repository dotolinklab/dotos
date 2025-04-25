
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface PostFormControlsProps {
  isSubmitting: boolean;
}

const PostFormControls = ({ isSubmitting }: PostFormControlsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate('/admin/blog')}
      >
        취소
      </Button>
      <Button 
        type="submit" 
        className="bg-purple-700 hover:bg-purple-800"
        disabled={isSubmitting}
      >
        {isSubmitting ? '저장 중...' : '포스트 업데이트'}
      </Button>
    </div>
  );
};

export default PostFormControls;
