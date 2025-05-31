
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Palette, Users, BarChart3, Megaphone, Camera, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: TrendingUp,
      title: "Social Media Marketing",
      description: "Comprehensive social media strategies that drive engagement, build communities, and convert followers into customers.",
      features: [
        "Strategic campaign planning",
        "Multi-platform management",
        "Community engagement",
        "Performance analytics",
        "Influencer partnerships"
      ]
    },
    {
      icon: Palette,
      title: "Brand Identity Design",
      description: "Create iconic visual identities that make your brand unforgettable and instantly recognizable.",
      features: [
        "Logo design & branding",
        "Brand guidelines",
        "Visual identity systems",
        "Typography selection",
        "Color palette development"
      ]
    },
    {
      icon: Camera,
      title: "Content Creation",
      description: "Viral-worthy content that resonates with your audience and builds authentic connections.",
      features: [
        "Social media graphics",
        "Video content production",
        "Photography direction",
        "Motion graphics",
        "Content calendars"
      ]
    },
    {
      icon: BarChart3,
      title: "Social Media Strategy",
      description: "Data-driven strategies that align with your business goals and maximize ROI.",
      features: [
        "Market research & analysis",
        "Competitor analysis",
        "Audience targeting",
        "Content strategy",
        "Growth optimization"
      ]
    },
    {
      icon: Megaphone,
      title: "Paid Social Advertising",
      description: "Targeted advertising campaigns that drive conversions and scale your business.",
      features: [
        "Campaign management",
        "Ad creative development",
        "Audience targeting",
        "A/B testing",
        "ROI optimization"
      ]
    },
    {
      icon: Users,
      title: "Brand Consulting",
      description: "Strategic guidance to position your brand for long-term success in the digital landscape.",
      features: [
        "Brand positioning",
        "Market positioning",
        "Digital transformation",
        "Brand architecture",
        "Strategic planning"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="bg-optra-gradient bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions that elevate your brand and amplify your social presence 
            through strategic marketing and exceptional design.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 glass-card border-0">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-optra-gradient rounded-lg">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground text-lg">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-optra-gradient rounded-full"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Our <span className="bg-optra-gradient bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that ensures exceptional results for every project.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", description: "Deep dive into your brand, goals, and target audience." },
              { step: "02", title: "Strategy", description: "Develop comprehensive strategies tailored to your objectives." },
              { step: "03", title: "Creation", description: "Design and produce high-quality content and campaigns." },
              { step: "04", title: "Optimization", description: "Continuously refine and improve performance metrics." }
            ].map((phase, index) => (
              <Card key={index} className="text-center glass-card border-0">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold bg-optra-gradient bg-clip-text text-transparent mb-4">
                    {phase.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                  <p className="text-muted-foreground">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="bg-optra-gradient bg-clip-text text-transparent">Get Started?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Let's discuss how our strategic approach to social media marketing and brand design 
            can transform your digital presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-optra-gradient hover:bg-optra-gradient-hover text-white text-lg px-8 py-4"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/work">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
