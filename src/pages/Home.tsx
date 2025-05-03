
import HeroBanner from "@/components/home/HeroBanner";
import StatisticsBanner from "@/components/home/StatisticsBanner";
import HowItWorks from "@/components/home/HowItWorks";
import DonationTypes from "@/components/home/DonationTypes";
import DonorMap from "@/components/map/DonorMap";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroBanner />
      
      {/* Statistics Banner */}
      <StatisticsBanner />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 sm:text-4xl">
              Find Donors Near You
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Use our interactive map to locate blood donors and healthcare facilities in your area.
            </p>
          </div>
          
          <DonorMap />
          
          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link to="/find-donor">Search For Donors</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Blood Types and Donation Info */}
      <DonationTypes />
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blood to-blood-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-12 w-12 mx-auto mb-6 text-white opacity-75" />
          <h2 className="text-3xl font-display font-bold sm:text-4xl">
            Ready to Make a Difference?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Your donation can save up to 3 lives. Register as a donor today or search for donors if you're in need.
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="font-medium">
              <Link to="/donor-registration">Register as Donor</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 font-medium">
              <Link to="/find-donor">Find a Donor</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
