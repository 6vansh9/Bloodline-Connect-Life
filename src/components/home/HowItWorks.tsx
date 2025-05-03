
import { CircleCheck, Search, Calendar, Bell } from "lucide-react";

const steps = [
  {
    title: "Register as a Donor",
    description: "Create your profile with your blood type and medical information.",
    icon: <CircleCheck className="h-6 w-6 text-white" />,
    color: "bg-blood",
  },
  {
    title: "Find Donors",
    description: "Search for compatible donors based on blood type and location.",
    icon: <Search className="h-6 w-6 text-white" />,
    color: "bg-blue-500",
  },
  {
    title: "Schedule Donation",
    description: "Book an appointment at a nearby donation center or hospital.",
    icon: <Calendar className="h-6 w-6 text-white" />,
    color: "bg-green-500",
  },
  {
    title: "Get Notified",
    description: "Receive alerts about donation requests matching your profile.",
    icon: <Bell className="h-6 w-6 text-white" />,
    color: "bg-purple-500",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to connect donors with recipients, streamlining the donation process.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 card-hover">
                <div className={`${step.color} rounded-full p-3 w-fit`}>
                  {step.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="hidden lg:block absolute -z-10 left-1/2 transform -translate-x-1/2 right-0 mx-auto w-3/4">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
