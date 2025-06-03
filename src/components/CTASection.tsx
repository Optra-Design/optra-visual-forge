
import { Send } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Brand?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Let's collaborate to create something extraordinary. Your vision, our expertise.
        </p>
        
        <a
          href="mailto:aniketh@optra.me?subject=Project Inquiry&body=Hi Aniketh,%0D%0A%0D%0AI'm interested in working with Optra Design. Here are my project details:%0D%0A%0D%0AProject Type:%0D%0ABudget Range:%0D%0ATimeline:%0D%0AProject Description:%0D%0A%0D%0ALooking forward to hearing from you!"
          className="inline-flex items-center gap-3 bg-optra-gradient hover:scale-105 transition-transform px-8 py-4 rounded-2xl text-white font-semibold text-lg"
        >
          <Send className="w-6 h-6" />
          Get In Touch
        </a>
      </div>
    </section>
  );
};

export default CTASection;
