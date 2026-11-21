import About from '@/components/About';
import ChatWidget from '@/components/ChatBot';
import Contact from '@/components/Contact';
import Expertise from '@/components/Expertise';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Loader from '@/components/Loader';
import Process from '@/components/Process';
import Product from '@/components/Product';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Loader />
      <Header />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Product />
        <Process />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
