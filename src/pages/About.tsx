
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Lightbulb, Award, Users } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Strategic Focus",
      description: "Every campaign and design decision is driven by data and strategic thinking."
    },
    {
      icon: Lightbulb,
      title: "Creative Excellence",
      description: "We push creative boundaries to deliver visuals that truly stand out."
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "We maintain the highest standards in every project we undertake."
    },
    {
      icon: Users,
      title: "Client Partnership",
      description: "We work as an extension of your team, invested in your success."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="bg-optra-gradient bg-clip-text text-transparent">Optra Design</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're a team of strategists, designers, and marketers passionate about creating 
            digital experiences that drive real business growth.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Founded with a vision to bridge the gap between strategic marketing and exceptional design, 
              Optra Design has grown to become a trusted partner for brands seeking to make a lasting impact 
              in the digital landscape.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Our approach combines data-driven social media marketing with visually stunning brand design 
              to create cohesive digital experiences that not only look amazing but deliver measurable results.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, we're proud to work with innovative companies across industries, helping them build 
              authentic connections with their audiences through strategic storytelling and compelling visuals.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square bg-optra-gradient rounded-3xl opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Our <span className="bg-optra-gradient bg-clip-text text-transparent">Mission</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            To empower brands with strategic social media marketing and exceptional design that 
            creates meaningful connections, drives engagement, and delivers measurable growth 
            in an increasingly competitive digital landscape.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="glass-card border-0 hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <value.icon className="h-10 w-10 mx-auto mb-4 text-optra-orange" />
                  <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Meet the <span className="bg-optra-gradient bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A diverse group of creative professionals united by our passion for 
              exceptional design and strategic marketing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <Card key={member} className="overflow-hidden hover:scale-105 transition-all duration-300">
                <div className="aspect-square bg-gradient-to-br from-optra-orange to-optra-red"></div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Team Member {member}</h3>
                  <p className="text-muted-foreground mb-3">Creative Director</p>
                  <p className="text-sm text-muted-foreground">
                    Passionate about creating designs that tell compelling stories and drive results.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Our <span className="bg-optra-gradient bg-clip-text text-transparent">Journey</span>
            </h2>
          </div>
          
          <div className="space-y-8">
            {[
              { year: "2020", title: "Foundation", description: "Optra Design was founded with a vision to revolutionize digital marketing." },
              { year: "2021", title: "First Major Campaigns", description: "Launched successful campaigns for 50+ brands across various industries." },
              { year: "2022", title: "Award Recognition", description: "Received multiple industry awards for creative excellence and innovation." },
              { year: "2023", title: "Expansion", description: "Expanded our team and service offerings to include comprehensive brand strategy." },
              { year: "2024", title: "Global Reach", description: "Now serving clients worldwide with a focus on premium digital experiences." }
            ].map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-20 h-20 bg-optra-gradient rounded-full flex items-center justify-center text-white font-bold">
                  {milestone.year}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
