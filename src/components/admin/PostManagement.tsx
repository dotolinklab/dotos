
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PostManagementProps {
  posts: Array<{
    id: number;
    title: string;
    category: string;
    date: string;
    status: string;
  }>;
  categories: string[];
}

const PostManagement = ({ posts }: PostManagementProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-purple-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-purple-700">게시물 관리</h3>
        <Button className="bg-purple-700 hover:bg-purple-800">
          새 글 작성
        </Button>
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
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    post.status === '게시됨' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">수정</Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">삭제</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PostManagement;
