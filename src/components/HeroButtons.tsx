
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroButtons = () => {
  return (
    <div className="flex justify-center mb-16">
      <Button 
        size="lg" 
        className="bg-optra-gradient hover:scale-105 transition-transform px-8 py-4 text-lg font-semibold"
        asChild
      >
        <Link to="/contact">
          Start Your Project
        </Link>
      </Button>
    </div>
  );
};

export default HeroButtons;
