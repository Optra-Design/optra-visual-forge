
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, TrendingUp, Palette, Users, Star } from 'lucide-react';
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      content: "Optra transformed our social presence completely. Our engagement increased by 300% in just 2 months!",
      rating: 5
    },
    {
      name: "Mark Chen",
      company: "EcoLife Brand",
      content: "The brand identity they created for us is simply stunning. It perfectly captures our vision and values.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      company: "Fashion Forward",
      content: "Their social media strategy helped us reach 1M followers. The ROI has been incredible!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-optra-orange/10 to-optra-red/10 dark:from-optra-orange/5 dark:to-optra-red/5" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <img 
              src="/lovable-uploads/ed81d01d-3b7d-433f-8dad-285d379ff507.png" 
              alt="Optra Design" 
              className="h-20 w-auto mx-auto mb-8 animate-scale-in"
            />
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Design Beyond
              <span className="block bg-optra-gradient bg-clip-text text-transparent">
                Expectation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Premium social media marketing and brand design agency delivering 
              high-end digital experiences that drive growth and engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-optra-gradient hover:bg-optra-gradient-hover text-white text-lg px-8 py-4"
              >
                Start Your Visual Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What We <span className="bg-optra-gradient bg-clip-text text-transparent">Excel At</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital solutions that elevate your brand and amplify your social presence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 glass-card border-0">
                <CardContent className="p-8 text-center">
                  <service.icon className="h-12 w-12 mx-auto mb-6 text-optra-orange group-hover:text-optra-red transition-colors" />
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="bg-optra-gradient bg-clip-text text-transparent">Work</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A glimpse into our award-winning campaigns and brand transformations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="group overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300">
                <div className="aspect-square bg-gradient-to-br from-optra-orange to-optra-red relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      View Project
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/work">
              <Button size="lg" variant="outline">
                View All Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Client <span className="bg-optra-gradient bg-clip-text text-transparent">Success</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from brands that have transformed their digital presence with us.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card border-0">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-optra-orange text-optra-orange" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-optra-gradient opacity-10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to <span className="bg-optra-gradient bg-clip-text text-transparent">Transform</span> Your Brand?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join hundreds of brands that have elevated their digital presence with our strategic approach to social media marketing and brand design.
          </p>
          <Link to="/contact">
            <Button 
              size="lg" 
              className="bg-optra-gradient hover:bg-optra-gradient-hover text-white text-lg px-12 py-4"
            >
              Let's Build Something Beautiful
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img 
              src="/lovable-uploads/ed81d01d-3b7d-433f-8dad-285d379ff507.png" 
              alt="Optra Design" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold bg-optra-gradient bg-clip-text text-transparent">
              Optra Design
            </span>
          </div>
          <p className="text-muted-foreground mb-4">
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
