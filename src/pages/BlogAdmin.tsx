
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Pencil, LayoutDashboard, FileText, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const BlogAdmin = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('AI 소식');

  // Sample categories from main page
  const categories = ['AI 소식', '부업하기', '렌탈솔루션', '배움터'];

  // Sample posts data for the management tab
  const samplePosts = [
    { id: 1, title: 'ChatGPT-5 출시', category: 'AI 소식', date: '2025-04-21', status: '게시됨' },
    { id: 2, title: '2025년 가장 수익성 높은 온라인 부업 TOP 5', category: '부업하기', date: '2025-04-18', status: '게시됨' },
    { id: 3, title: '비개발자를 위한 AI 활용법: 기초 가이드', category: '배움터', date: '2025-04-15', status: '게시됨' },
    { id: 4, title: '임시 저장된 글', category: '렌탈솔루션', date: '2025-04-22', status: '임시저장' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we'll add the blog post submission logic later
    toast.success('블로그 포스트가 저장되었습니다.');
    setTitle('');
    setContent('');
    setCategory('AI 소식');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="pt-32 pb-16 px-4 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 flex items-center gap-4">
            <Pencil className="w-8 h-8" />
            블로그 관리
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mb-8">
            새로운 블로그 포스트를 작성하고 관리하세요
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="mb-8 bg-purple-50">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                대시보드
              </TabsTrigger>
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                포스트 관리
              </TabsTrigger>
              <TabsTrigger value="write" className="flex items-center gap-2">
                <Pencil className="w-4 h-4" />
                글쓰기
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                설정
              </TabsTrigger>
            </TabsList>
            
            {/* Dashboard Content */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-purple-100">
                  <h3 className="text-xl font-bold mb-2 text-purple-700">총 게시물</h3>
                  <p className="text-3xl font-bold">12</p>
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
                      <p className="text-2xl font-bold mt-2">{Math.floor(Math.random() * 10)}</p>
                      <p className="text-sm text-gray-500">게시물</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Posts Management Content */}
            <TabsContent value="posts" className="space-y-6">
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
                      {samplePosts.map((post) => (
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
            </TabsContent>
            
            {/* Write Content */}
            <TabsContent value="write" className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-8 border border-purple-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">제목</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="블로그 포스트 제목을 입력하세요"
                      className="text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">카테고리</Label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">내용</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="블로그 내용을 입력하세요"
                      className="min-h-[400px] text-base"
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setTitle('');
                        setContent('');
                        setCategory('AI 소식');
                      }}
                    >
                      초기화
                    </Button>
                    <Button type="submit" className="bg-purple-700 hover:bg-purple-800">
                      포스트 저장하기
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            {/* Settings Content */}
            <TabsContent value="settings" className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-8 border border-purple-100">
                <h3 className="text-xl font-bold mb-6 text-purple-700">블로그 설정</h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="blogName">블로그 이름</Label>
                    <Input id="blogName" defaultValue="AI 블로그" placeholder="블로그 이름을 입력하세요" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="blogDescription">블로그 설명</Label>
                    <Textarea id="blogDescription" defaultValue="AI 관련 최신 소식과 정보를 제공하는 블로그입니다." placeholder="블로그 설명을 입력하세요" />
                  </div>
                  
                  <h4 className="text-lg font-semibold mt-8 mb-4 text-purple-700">카테고리 관리</h4>
                  
                  <div className="space-y-4">
                    {categories.map((cat, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <Input defaultValue={cat} />
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          삭제
                        </Button>
                      </div>
                    ))}
                    
                    <div className="flex items-center gap-4 mt-4">
                      <Input placeholder="새 카테고리 이름" />
                      <Button variant="outline">추가</Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <Button className="bg-purple-700 hover:bg-purple-800">
                      설정 저장하기
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default BlogAdmin;
