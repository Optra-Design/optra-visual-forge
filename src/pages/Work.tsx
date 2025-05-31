
import Navbar from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Filter } from 'lucide-react';
import { useState } from 'react';

const Work = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  const filters = ['All', 'Social Media', 'Brand Design', 'Content Creation', 'Strategy'];
  
  const projects = [
    {
      id: 1,
      title: "TechStart Social Campaign",
      category: "Social Media",
      description: "300% engagement increase through strategic content planning",
      tags: ["Social Media", "Strategy", "B2B"],
      image: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "EcoLife Brand Identity",
      category: "Brand Design",
      description: "Complete visual identity for sustainable lifestyle brand",
      tags: ["Brand Design", "Logo", "Guidelines"],
      image: "bg-gradient-to-br from-green-500 to-emerald-600"
    },
    {
      id: 3,
      title: "Fashion Forward Campaign",
      category: "Content Creation",
      description: "Viral content series reaching 1M+ impressions",
      tags: ["Content Creation", "Video", "Fashion"],
      image: "bg-gradient-to-br from-pink-500 to-red-600"
    },
    {
      id: 4,
      title: "FoodieHub Strategy",
      category: "Strategy",
      description: "Multi-platform strategy driving 500% follower growth",
      tags: ["Strategy", "Analytics", "Food & Beverage"],
      image: "bg-gradient-to-br from-orange-500 to-yellow-600"
    },
    {
      id: 5,
      title: "HealthTech Rebrand",
      category: "Brand Design",
      description: "Modern healthcare brand transformation",
      tags: ["Brand Design", "Healthcare", "Digital"],
      image: "bg-gradient-to-br from-teal-500 to-cyan-600"
    },
    {
      id: 6,
      title: "TravelMore Campaign",
      category: "Social Media",
      description: "Instagram-first campaign driving bookings",
      tags: ["Social Media", "Travel", "Instagram"],
      image: "bg-gradient-to-br from-indigo-500 to-blue-600"
    },
    {
      id: 7,
      title: "SportGear Content",
      category: "Content Creation",
      description: "Athletic brand content driving community engagement",
      tags: ["Content Creation", "Sports", "Community"],
      image: "bg-gradient-to-br from-red-500 to-orange-600"
    },
    {
      id: 8,
      title: "FinanceApp Strategy",
      category: "Strategy",
      description: "Financial services social media transformation",
      tags: ["Strategy", "Fintech", "Education"],
      image: "bg-gradient-to-br from-purple-500 to-pink-600"
    },
    {
      id: 9,
      title: "Beauty Brand Identity",
      category: "Brand Design",
      description: "Luxury beauty brand visual identity system",
      tags: ["Brand Design", "Beauty", "Luxury"],
      image: "bg-gradient-to-br from-rose-500 to-pink-600"
    }
  ];

  const filteredProjects = selectedFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="bg-optra-gradient bg-clip-text text-transparent">Work</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of successful campaigns, brand transformations, and digital experiences 
            that have driven real results for our clients.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <Filter className="h-5 w-5 text-muted-foreground" />
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                className={selectedFilter === filter ? "bg-optra-gradient hover:bg-optra-gradient-hover text-white" : ""}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="group overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300">
                <div className={`aspect-square ${project.image} relative`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <ExternalLink className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Results That <span className="bg-optra-gradient bg-clip-text text-transparent">Matter</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "200+", label: "Projects Completed" },
              { number: "150+", label: "Happy Clients" },
              { number: "500%", label: "Average Growth" },
              { number: "50M+", label: "Impressions Generated" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-optra-gradient bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Want to See <span className="bg-optra-gradient bg-clip-text text-transparent">Detailed</span> Case Studies?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Get access to in-depth case studies showing our process, challenges, and the measurable 
            results we achieved for our clients.
          </p>
          <Button 
            size="lg" 
            className="bg-optra-gradient hover:bg-optra-gradient-hover text-white text-lg px-8 py-4"
          >
            Request Case Studies
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Work;
