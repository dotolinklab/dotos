
import React from 'react';
import { Label } from "@/components/ui/label";

interface PostCategorySelectProps {
  categories: string[];
  selectedCategory: string;
  onChange: (value: string) => void;
}

const PostCategorySelect = ({ categories, selectedCategory, onChange }: PostCategorySelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="category">카테고리</Label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

export default PostCategorySelect;
