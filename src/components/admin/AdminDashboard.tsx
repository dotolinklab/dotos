
import React from 'react';
import { Card } from "@/components/ui/card";
import { useIsMobile } from '@/hooks/use-mobile';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  posts: Array<{
    id: string;
    title: string;
    category: string;
    date: string;
    status: string;
  }>;
  categories: string[];
  isLoading?: boolean;
}

const AdminDashboard = ({ posts, categories, isLoading = false }: AdminDashboardProps) => {
  const isMobile = useIsMobile();
  
  // Create count by category
  const categoryCount = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = posts.filter(post => post.category === cat).length;
    return acc;
  }, {});
  
  // Format data for the chart
  const chartData = categories.map(cat => ({
    name: cat,
    posts: categoryCount[cat] || 0
  }));

  // Find most popular category
  let topCategory = { name: categories[0] || '카테고리 없음', count: 0 };
  
  Object.entries(categoryCount).forEach(([cat, count]) => {
    if (count > topCategory.count) {
      topCategory.count = count;
      topCategory.name = cat;
    }
  });

  // Calculate total count of published posts
  const publishedCount = posts.filter(post => post.status === 'published').length;
  const draftCount = posts.length - publishedCount;
  const publishedPercentage = posts.length > 0 ? Math.round((publishedCount / posts.length) * 100) : 0;

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">데이터를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-l-4 border-l-purple-500">
          <h3 className="text-lg font-medium mb-2 text-gray-700">총 게시물</h3>
          <p className="text-3xl font-bold text-purple-700">{posts.length}</p>
          <p className="text-sm text-gray-500 mt-1">
            게시 {publishedCount} / 임시저장 {draftCount}
          </p>
        </Card>
        <Card className="p-6 border-l-4 border-l-purple-500">
          <h3 className="text-lg font-medium mb-2 text-gray-700">게시 상태</h3>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-purple-700">{publishedPercentage}%</p>
            <p className="text-sm text-gray-500">게시됨</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
            <div 
              className="bg-purple-600 h-2.5 rounded-full" 
              style={{ width: `${publishedPercentage}%` }}
            ></div>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-purple-500">
          <h3 className="text-lg font-medium mb-2 text-gray-700">인기 카테고리</h3>
          <p className="text-3xl font-bold text-purple-700">{topCategory.name}</p>
          <p className="text-sm text-gray-500 mt-1">{topCategory.count} 게시물</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-medium mb-6 text-gray-700">카테고리별 게시물</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                fontSize={12}
                tickFormatter={isMobile ? (value) => value.substring(0, 3) + '...' : undefined}
              />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="posts" name="게시물 수" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Card key={cat} className="p-4 border border-gray-200">
            <h4 className="font-medium text-gray-700">{cat}</h4>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-2xl font-bold text-purple-700">{categoryCount[cat] || 0}</p>
              <p className="text-sm text-gray-500">게시물</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
