
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface PostManagementProps {
  categories: string[];
  onSuccess?: () => void;
}

const PostManagement = ({ categories, onSuccess }: PostManagementProps) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const navigate = useNavigate();

  const { data: posts, isLoading, refetch } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: async () => {
      try {
        let query = supabase
          .from('blog_posts')
          .select('id, title, category, created_at, status')
          .order('created_at', { ascending: false });

        if (categoryFilter !== 'all') {
          query = query.eq('category', categoryFilter);
        }

        const { data, error } = await query;

        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('포스트를 불러오는 중 오류가 발생했습니다.');
        return [];
      }
    },
    enabled: true,
  });

  const handleDelete = async (id: string) => {
    if (!window.confirm('정말로 이 포스트를 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('포스트가 삭제되었습니다.');
      refetch();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('포스트 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/blog/edit/${id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-purple-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-purple-700">게시물 관리</h3>
        <div className="flex items-center gap-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">모든 카테고리</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>제목</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>작성일</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  불러오는 중...
                </TableCell>
              </TableRow>
            ) : posts && posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  작성된 포스트가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              posts?.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{formatDate(post.created_at)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status === 'published' ? '게시됨' : '임시저장'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(post.id)}
                      >
                        수정
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(post.id)}
                      >
                        삭제
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PostManagement;
