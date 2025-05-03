import { Heart, Droplet, Users } from "lucide-react";

const StatisticsBanner = () => {
  const stats = [
    {
      id: 1,
      label: "Lives Saved",
      value: "38,500+",
      icon: <Heart className="h-6 w-6 text-blood" />,
      description: "Through blood and organ donations"
    },
    {
      id: 2,
      label: "Registered Donors",
      value: "10,000+",
      icon: <Users className="h-6 w-6 text-blood" />,
      description: "And growing every day"
    },
    {
      id: 3,
      label: "Donations Made",
      value: "45,800+",
      icon: <Droplet className="h-6 w-6 text-blood" />,
      description: "Blood, plasma, and organs"
    }
  ];

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 card-hover"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blood-50 mb-4">
                {stat.icon}
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-lg font-medium text-blood-500 mt-1">{stat.label}</p>
              <p className="mt-2 text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsBanner;
