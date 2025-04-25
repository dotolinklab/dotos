
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Edit, Trash2, Plus, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  created_at: string;
  status: string;
}

const BlogPostsList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, category, created_at, status")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("포스트를 가져오는 중 오류가 발생했습니다:", error);
      toast.error("포스트를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("정말로 이 포스트를 삭제하시겠습니까?")) {
      return;
    }

    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
      toast.success("포스트가 삭제되었습니다!");
      fetchPosts();
    } catch (error) {
      console.error("포스트 삭제 중 오류가 발생했습니다:", error);
      toast.error("포스트 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 ml-60">
        <div className="max-w-[1200px] py-8 px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-purple-800">포스트 관리</h1>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => navigate("/admin/blog")}
            >
              <Plus size={18} className="mr-1" />
              새 포스트 작성
            </Button>
          </div>

          <Card className="p-4">
            {loading ? (
              <div className="text-center py-8">
                <p>포스트를 불러오는 중...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8">
                <p className="mb-4">작성된 포스트가 없습니다.</p>
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => navigate("/admin/blog")}
                >
                  <Plus size={18} className="mr-1" />
                  첫 포스트 작성하기
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[45%]">제목</TableHead>
                    <TableHead className="w-[15%]">카테고리</TableHead>
                    <TableHead className="w-[15%]">작성일</TableHead>
                    <TableHead className="w-[15%]">상태</TableHead>
                    <TableHead className="w-[10%] text-right">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell>
                        {format(new Date(post.created_at), "yyyy-MM-dd")}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs ${
                            post.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {post.status === "published" ? "게시됨" : "임시저장"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const baseUrl = post.category === "AI 소식"
                                ? "/ai-news"
                                : post.category === "부업하기"
                                ? "/side-hustles"
                                : post.category === "렌탈솔루션"
                                ? "/rental"
                                : "/learning";
                              window.open(`${baseUrl}/${post.id}`, "_blank");
                            }}
                          >
                            <Eye size={16} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              navigate(`/admin/blog/edit/${post.id}`)
                            }
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BlogPostsList;
