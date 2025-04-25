
import { Card } from "@/components/ui/card";

interface AdminDashboardProps {
  posts: Array<{
    id: number;
    title: string;
    category: string;
    date: string;
    status: string;
  }>;
  categories: string[];
}

const AdminDashboard = ({ posts, categories }: AdminDashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-purple-100">
          <h3 className="text-xl font-bold mb-2 text-purple-700">총 게시물</h3>
          <p className="text-3xl font-bold">{posts.length}</p>
          <p className="text-sm text-gray-500 mt-1">지난주 대비 +3</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-purple-100">
          <h3 className="text-xl font-bold mb-2 text-purple-700">총 조회수</h3>
          <p className="text-3xl font-bold">1,245</p>
          <p className="text-sm text-gray-500 mt-1">지난주 대비 +122</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-purple-100">
          <h3 className="text-xl font-bold mb-2 text-purple-700">인기 카테고리</h3>
          <p className="text-3xl font-bold">AI 소식</p>
          <p className="text-sm text-gray-500 mt-1">전체 조회수의 45%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-purple-100">
        <h3 className="text-xl font-bold mb-4 text-purple-700">카테고리별 게시물</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div key={cat} className="p-4 border rounded-lg text-center">
              <p className="font-semibold text-purple-700">{cat}</p>
              <p className="text-2xl font-bold mt-2">
                {posts.filter(post => post.category === cat).length}
              </p>
              <p className="text-sm text-gray-500">게시물</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
