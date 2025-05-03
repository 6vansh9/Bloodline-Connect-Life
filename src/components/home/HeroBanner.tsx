import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Droplet } from "lucide-react";

const HeroBanner = () => {
  return (
    <div className="hero-gradient">
      <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:pt-24 sm:pb-32 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-8 animate-fade-in">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-gray-900">
                <span className="block">Save Lives Through</span>
                <span className="block text-blood">Blood & Organ Donation</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
                Connect donors with those in need. Register as a donor or find a match in minutes. Your donation can save up to 3 lives.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="font-medium">
                <Link to="/donor-registration">
                  Become a Donor
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-medium">
                <Link to="/find-donor">
                  Find a Donor
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 pt-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
              </div>
              <p className="text-sm text-gray-600">Join 10,000+ donors who have already registered</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-blood-100 rounded-full opacity-70 filter blur-3xl animate-pulse-slow"></div>
              <div className="absolute bottom-0 -right-4 w-72 h-72 bg-blue-100 rounded-full opacity-70 filter blur-3xl animate-pulse-slow"></div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
                  alt="Blood donation" 
                  className="w-full h-auto rounded-2xl shadow-xl animate-float"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Droplet className="h-8 w-8 text-blood animate-pulse" />
                    <div>
                      <p className="text-xs text-gray-500">Total donations this month</p>
                      <p className="text-xl font-bold">1,249</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
