
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const MockMapComponent = () => {
  return (
    <div className="bg-gray-200 rounded-lg w-full h-full min-h-[500px] flex items-center justify-center">
      <div className="text-center p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
        <p className="text-gray-600 mb-4">
          This is a placeholder for the Google Maps integration that would show donors and hospitals near you.
        </p>
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          {/* Donor location markers */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white p-3 rounded-md shadow-sm flex justify-center items-center">
              <div className="relative">
                <div className="h-6 w-6 rounded-full bg-blood-400 flex items-center justify-center text-white text-xs">
                  {["A+", "B+", "O+", "AB+", "A-"][i]}
                </div>
                <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
              </div>
            </div>
          ))}
          
          {/* Hospital markers */}
          {[...Array(4)].map((_, i) => (
            <div key={`hosp-${i}`} className="bg-white p-3 rounded-md shadow-sm flex justify-center items-center">
              <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                H
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DonorMap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<{lat: number; lng: number} | null>(null);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Mock location - would use browser's geolocation in real app
      setCurrentLocation({ lat: 34.0522, lng: -118.2437 });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Card className="overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-lg font-medium">Nearby Donors & Healthcare Centers</h3>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-blood-400 mr-2"></span>
              <span>Blood Donors</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
              <span>Hospitals</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
              <span>Available Now</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-[500px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blood"></div>
          </div>
        ) : (
          <MockMapComponent />
        )}
      </div>
    </Card>
  );
};

export default DonorMap;
