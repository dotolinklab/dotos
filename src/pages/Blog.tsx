
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';

const Blog = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Share your thoughts and insights with our community
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample blog posts */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                <h3 className="text-xl font-bold mb-3">Blog Post {item}</h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <Button variant="outline" className="w-full">Read More</Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
