
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, TrendingUp, Palette, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const services = [
    {
      icon: TrendingUp,
      title: "Social Media Marketing",
      description: "Strategic campaigns that drive engagement and conversions across all platforms."
    },
    {
      icon: Palette,
      title: "Brand Design",
      description: "Iconic visual identities that make your brand unforgettable and distinctive."
    },
    {
      icon: Users,
      title: "Content Creation",
      description: "Viral-worthy content that resonates with your audience and builds community."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-optra-orange/20 to-optra-red/20 dark:from-optra-orange/10 dark:to-optra-red/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.1),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto text-center w-full">
          <div className="animate-fade-in">
            <div className="mb-12 relative">
              <div className="absolute inset-0 bg-optra-gradient opacity-20 blur-3xl rounded-full scale-150 animate-pulse"></div>
              <img 
                src="/lovable-uploads/ed81d01d-3b7d-433f-8dad-285d379ff507.png" 
                alt="Optra Design" 
                className="h-32 md:h-40 w-auto mx-auto animate-scale-in relative z-10 drop-shadow-2xl"
              />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              Design Beyond
              <span className="block bg-optra-gradient bg-clip-text text-transparent animate-pulse">
                Expectation
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              Premium social media marketing and brand design agency delivering 
              high-end digital experiences that drive growth and engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-optra-gradient hover:bg-optra-gradient-hover text-white text-xl px-12 py-6 shadow-2xl hover:shadow-optra-orange/25 hover:scale-105 transition-all duration-300"
              >
                Start Your Visual Journey
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-xl px-12 py-6 border-2 hover:bg-optra-gradient hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105"
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              What We <span className="bg-optra-gradient bg-clip-text text-transparent">Excel At</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive digital solutions that elevate your brand and amplify your social presence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <Card key={index} className="group hover:scale-110 transition-all duration-500 glass-card border-0 hover:shadow-2xl hover:shadow-optra-orange/20">
                <CardContent className="p-10 text-center">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-optra-gradient opacity-20 blur-xl rounded-full group-hover:opacity-40 transition-all duration-500"></div>
                    <service.icon className="h-16 w-16 mx-auto text-optra-orange group-hover:text-optra-red transition-colors duration-300 relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6">{service.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-optra-orange/5 to-optra-red/5" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Featured <span className="bg-optra-gradient bg-clip-text text-transparent">Work</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              A glimpse into our award-winning campaigns and brand transformations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="group overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-optra-orange to-optra-red relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                    <span className="text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      View Project
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/work">
              <Button size="lg" variant="outline" className="text-xl px-12 py-6 border-2 hover:bg-optra-gradient hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105">
                View All Work
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-optra-gradient opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,107,53,0.2),transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Ready to <span className="bg-optra-gradient bg-clip-text text-transparent">Transform</span> Your Brand?
          </h2>
          <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of brands that have elevated their digital presence with our strategic approach to social media marketing and brand design.
          </p>
          <Link to="/contact">
            <Button 
              size="lg" 
              className="bg-optra-gradient hover:bg-optra-gradient-hover text-white text-xl px-16 py-6 shadow-2xl hover:shadow-optra-orange/30 hover:scale-105 transition-all duration-300"
            >
              Let's Build Something Beautiful
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t relative">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <img 
              src="/lovable-uploads/ed81d01d-3b7d-433f-8dad-285d379ff507.png" 
              alt="Optra Design" 
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold bg-optra-gradient bg-clip-text text-transparent">
              Optra Design
            </span>
          </div>
          <p className="text-muted-foreground mb-6 text-lg">
            Premium Social Media Marketing & Brand Design Agency
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 Optra Design. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
