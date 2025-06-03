
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
          
         
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <ServicePreview />
      
      {/* Additional content section to make users explore more */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Optra Design?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Every project is a partnership. We don't just deliver designs—we craft experiences that tell your story and drive your success.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 text-center">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2">Creative Excellence</h3>
              <p className="text-sm text-muted-foreground">Award-winning designs that stand out</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Quick turnaround without compromising quality</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Personal Touch</h3>
              <p className="text-sm text-muted-foreground">Direct collaboration with founder Aniketh</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Results Driven</h3>
              <p className="text-sm text-muted-foreground">Designs that convert and perform</p>
            </div>
          </div>
        </div>
      </section>
      
      <CTASection />
    </div>
  );
};

export default Index;
