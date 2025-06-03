
import { Star, Zap, Award } from 'lucide-react';

const ServicePreview = () => {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What We Create</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From brand identity to digital experiences, we bring your vision to life with precision and creativity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-optra-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Brand Identity</h3>
            <p className="text-muted-foreground">
              Comprehensive brand systems that capture your essence and resonate with your audience.
            </p>
          </div>
          
          <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-optra-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Web Design</h3>
            <p className="text-muted-foreground">
              Interactive websites that combine stunning visuals with seamless user experience.
            </p>
          </div>
          
          <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-optra-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Creative Direction</h3>
            <p className="text-muted-foreground">
              Strategic creative guidance to ensure your brand communicates effectively across all touchpoints.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePreview;
