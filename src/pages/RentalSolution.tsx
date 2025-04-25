
import Navigation from '@/components/Navigation';

const RentalSolution = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Rental Solution
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Discover our comprehensive rental solutions
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-4">Our Services</h3>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Professional Equipment Rental</li>
                <li>✓ Flexible Rental Terms</li>
                <li>✓ 24/7 Technical Support</li>
                <li>✓ Nationwide Coverage</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-4">Benefits</h3>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Cost-Effective Solutions</li>
                <li>✓ Latest Equipment</li>
                <li>✓ Expert Maintenance</li>
                <li>✓ Quick Response Time</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RentalSolution;
