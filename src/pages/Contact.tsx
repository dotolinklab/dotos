
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 text-center">
            Get in touch with our team
          </p>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Message subject" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Your message"
                className="min-h-[150px]"
              />
            </div>
            <Button className="w-full">Send Message</Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
