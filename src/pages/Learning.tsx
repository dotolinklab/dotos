
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';

const Learning = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Learning Center
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Expand your knowledge with our educational resources
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <div key={level} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">{level} Courses</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive learning materials tailored for {level.toLowerCase()} level students.
                </p>
                <Button className="w-full">View Courses</Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Learning;
