
import { Button } from '@/components/ui/button';

const HeroButtons = () => {
  return (
    <div className="flex justify-center mb-16">
      <Button 
        size="lg" 
        className="bg-optra-gradient hover:scale-105 transition-transform px-8 py-4 text-lg font-semibold"
        onClick={() => {
          document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Explore Our Work
      </Button>
    </div>
  );
};

export default HeroButtons;
