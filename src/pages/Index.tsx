
import AnimatedHeroText from '../components/AnimatedHeroText';
import HeroButtons from '../components/HeroButtons';
import ServicePreview from '../components/ServicePreview';
import CTASection from '../components/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedHeroText />
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Where creativity meets strategy. We craft digital experiences that don't just look stunning—they drive results and transform businesses.
          </p>
          
          <HeroButtons />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <ServicePreview />
      <CTASection />
    </div>
  );
};

export default Index;
