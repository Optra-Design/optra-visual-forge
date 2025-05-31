
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, TrendingUp, Palette, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [backgroundParticles, setBackgroundParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    baseX: number; 
    baseY: number; 
    emoji: string; 
    speed: number;
    scale: number;
  }>>([]);

  const emojis = ['🚀', '✨', '💫', '🎯', '🔥', '💎', '⚡', '🌟', '🎨', '📱', '🌈', '💜', '🧡', '💖'];

  // Initialize background particles
  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 25; i++) {
      particles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        baseX: Math.random() * window.innerWidth,
        baseY: Math.random() * window.innerHeight,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        speed: 0.5 + Math.random() * 1,
        scale: 0.8 + Math.random() * 0.4
      });
    }
    setBackgroundParticles(particles);
  }, []);

  // Handle mouse movement and particle reactions
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      setBackgroundParticles(prev => prev.map(particle => {
        const dx = e.clientX - particle.x;
        const dy = e.clientY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          const repelForce = force * 30;
          
          return {
            ...particle,
            x: particle.x - Math.cos(angle) * repelForce * particle.speed,
            y: particle.y - Math.sin(angle) * repelForce * particle.speed
          };
        } else {
          // Slowly return to base position
          const returnForce = 0.02;
          return {
            ...particle,
            x: particle.x + (particle.baseX - particle.x) * returnForce,
            y: particle.y + (particle.baseY - particle.y) * returnForce
          };
        }
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />
      
      {/* Interactive Background Emoji Particles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {backgroundParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute text-3xl opacity-60 hover:opacity-100 transition-all duration-300 animate-pulse"
            style={{
              left: particle.x - 24,
              top: particle.y - 24,
              transform: `scale(${particle.scale})`,
              filter: 'drop-shadow(0 0 10px rgba(255, 107, 53, 0.3))',
              animationDelay: `${particle.id * 0.1}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>

      {/* Enhanced Background Effects with more vibrancy */}
      <div className="fixed inset-0 bg-gradient-to-br from-optra-orange/40 via-purple-500/30 to-optra-red/40 dark:from-optra-orange/20 dark:via-purple-500/15 dark:to-optra-red/20 animate-pulse"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,107,53,0.3),transparent_50%)]"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(230,57,70,0.3),transparent_50%)]"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.2),transparent_70%)]"></div>
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden min-h-screen flex items-center z-20">
        <div className="relative max-w-7xl mx-auto text-center w-full">
          <div className="animate-fade-in">
            <div className="mb-12 relative">
              <div className="absolute inset-0 bg-optra-gradient opacity-50 blur-3xl rounded-full scale-150 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-2xl rounded-full scale-125 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 blur-xl rounded-full scale-110 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <img 
                src="/optra.jpg" 
                alt="Optra Design" 
                className="h-40 md:h-48 w-auto mx-auto animate-scale-in relative z-10 drop-shadow-2xl hover:scale-110 transition-all duration-500 filter brightness-110"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(255, 107, 53, 0.6)) drop-shadow(0 0 60px rgba(147, 51, 234, 0.4))'
                }}
              />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              Design Beyond
              <span className="block bg-gradient-to-r from-optra-orange via-purple-500 to-optra-red bg-clip-text text-transparent animate-pulse">
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
                className="bg-gradient-to-r from-optra-orange to-optra-red hover:from-optra-red hover:to-optra-orange text-white text-xl px-12 py-6 shadow-2xl hover:shadow-optra-orange/25 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                Start Your Visual Journey
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-xl px-12 py-6 border-2 hover:bg-gradient-to-r hover:from-optra-orange hover:to-optra-red hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-4 relative z-20">
        <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              What We <span className="bg-gradient-to-r from-optra-orange via-purple-500 to-optra-red bg-clip-text text-transparent">Excel At</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive digital solutions that elevate your brand and amplify your social presence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <Card key={index} className="group hover:scale-110 transition-all duration-500 glass-card border-0 hover:shadow-2xl hover:shadow-optra-orange/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-10 text-center relative z-10">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-optra-orange to-optra-red opacity-20 blur-xl rounded-full group-hover:opacity-40 transition-all duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-xl rounded-full transition-all duration-500"></div>
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

      {/* CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-optra-orange/10 via-purple-500/10 to-optra-red/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,107,53,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.2),transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Ready to <span className="bg-gradient-to-r from-optra-orange via-purple-500 to-optra-red bg-clip-text text-transparent">Transform</span> Your Brand?
          </h2>
          <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of brands that have elevated their digital presence with our strategic approach to social media marketing and brand design.
          </p>
          <Link to="/contact">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-optra-orange via-purple-500 to-optra-red hover:scale-105 text-white text-xl px-16 py-6 shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
              Let's Build Something Beautiful
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t relative z-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <img 
              src="optra.jpg" 
              alt="Optra Design" 
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-optra-orange to-optra-red bg-clip-text text-transparent">
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
