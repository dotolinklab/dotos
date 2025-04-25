
import React from 'react';
import { Label } from "@/components/ui/label";

interface PostStatusSelectProps {
  status: string;
  onChange: (value: string) => void;
}

const PostStatusSelect = ({ status, onChange }: PostStatusSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="status">상태</Label>
      <select
        id="status"
        value={status}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      >
        <option value="published">게시됨</option>
        <option value="draft">임시저장</option>
      </select>
    </div>
  );
};

export default PostStatusSelect;
