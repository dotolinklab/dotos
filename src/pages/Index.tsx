
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import FeaturedPosts from '@/components/home/FeaturedPosts';
import Categories from '@/components/home/Categories';
import Newsletter from '@/components/home/Newsletter';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Hero />
      <FeaturedPosts />
      <Categories />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
