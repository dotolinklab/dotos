
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';

const Community = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Community
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Connect with like-minded individuals in our community
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Forums', 'Events', 'Groups'].map((section) => (
              <div key={section} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">{section}</h3>
                <p className="text-gray-600 mb-6">
                  Join discussions and share experiences with community members.
                </p>
                <Button variant="outline" className="w-full">Explore {section}</Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
