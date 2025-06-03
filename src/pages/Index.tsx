
import { lazy, Suspense } from 'react';
import AnimatedHeroText from '../components/AnimatedHeroText';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Users, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactFormTest = lazy(() => import('../components/ContactFormTest'));

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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-optra-gradient hover:bg-optra-gradient-hover text-white px-8 py-4 text-lg font-semibold group"
              asChild
            >
              <Link to="/services">
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary/20 hover:border-primary/40 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link to="/contact">
                Start Your Project
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Design Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">3+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Brand?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's collaborate to create something extraordinary. Your vision, our expertise.
          </p>
          
          <Suspense fallback={
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }>
            <ContactFormTest />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default Index;
