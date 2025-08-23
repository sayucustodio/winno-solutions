import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Benefits from '@/components/Benefits';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import Portafolio from '@/components/Portafolio';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Benefits />
        <Portafolio />
        {/* <Pricing /> */}
        <Testimonials />
        {/* <Blog /> */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
