import Preloader from '@/components/Preloader';
import Cursor from '@/components/Cursor';
import Nav from '@/components/Nav';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Services from '@/components/sections/Services';
import Difference from '@/components/sections/Difference';
import Configurator from '@/components/sections/Configurator';
import Pricing from '@/components/sections/Pricing';
import ProjectFlow from '@/components/sections/ProjectFlow';
import CompetitorEdge from '@/components/sections/CompetitorEdge';
import SocialGrowth from '@/components/sections/SocialGrowth';
import Advertising from '@/components/sections/Advertising';
import Work from '@/components/sections/Work';
import WhyUs from '@/components/sections/WhyUs';
import ContinuousGrowth from '@/components/sections/ContinuousGrowth';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/sections/Footer';

function App() {
  return (
    <>
      <Preloader />
      <Cursor />
      <Nav />
      <main className="relative grain-overlay">
        <Hero />
        <Problem />
        <Services />
        <Difference />
        <Configurator />
        <Pricing />
        <ProjectFlow />
        <CompetitorEdge />
        <SocialGrowth />
        <Advertising />
        <Work />
        <WhyUs />
        <ContinuousGrowth />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}

export default App;
