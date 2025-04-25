
import { Card } from "@/components/ui/card";

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
  // Create count by category
  const categoryCount = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = posts.filter(post => post.category === cat).length;
    return acc;
  }, {});

  // Find most popular category
  let topCategory = categories[0];
  let topCount = 0;
  
  Object.entries(categoryCount).forEach(([cat, count]) => {
    if (count > topCount) {
      topCount = count;
      topCategory = cat;
    }
  });

  // Calculate total count of published posts
  const publishedCount = posts.filter(post => post.status === 'published').length;

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">데이터를 불러오는 중...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-purple-100">
              <h3 className="text-xl font-bold mb-2 text-purple-700">총 게시물</h3>
              <p className="text-3xl font-bold">{posts.length}</p>
              <p className="text-sm text-gray-500 mt-1">
                {publishedCount} 개시됨 / {posts.length - publishedCount} 임시저장
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-purple-100">
              <h3 className="text-xl font-bold mb-2 text-purple-700">게시 상태</h3>
              <p className="text-3xl font-bold">{Math.round((publishedCount / Math.max(posts.length, 1)) * 100)}%</p>
              <p className="text-sm text-gray-500 mt-1">게시물 게시 비율</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-purple-100">
              <h3 className="text-xl font-bold mb-2 text-purple-700">인기 카테고리</h3>
              <p className="text-3xl font-bold">{topCategory}</p>
              <p className="text-sm text-gray-500 mt-1">{topCount} 게시물</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-purple-100">
            <h3 className="text-xl font-bold mb-4 text-purple-700">카테고리별 게시물</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div key={cat} className="p-4 border rounded-lg text-center">
                  <p className="font-semibold text-purple-700">{cat}</p>
                  <p className="text-2xl font-bold mt-2">{categoryCount[cat] || 0}</p>
                  <p className="text-sm text-gray-500">게시물</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
