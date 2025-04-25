
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="pt-32 pb-16 px-4 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto mb-8">
            문의사항이 있으신가요? 언제든 연락주세요.
          </p>
        </div>
      </section>
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 border border-purple-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input id="name" placeholder="이름을 입력하세요" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input id="email" type="email" placeholder="이메일을 입력하세요" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">제목</Label>
                <Input id="subject" placeholder="제목을 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">메시지</Label>
                <Textarea
                  id="message"
                  placeholder="메시지를 입력하세요"
                  className="min-h-[150px]"
                />
              </div>
              <Button className="w-full bg-purple-700 hover:bg-purple-800">
                메시지 보내기
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
