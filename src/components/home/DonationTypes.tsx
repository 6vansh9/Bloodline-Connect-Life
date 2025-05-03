
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Drop, Heart } from "lucide-react";

const bloodTypes = [
  { type: "A+", canDonateTo: "A+, AB+", canReceiveFrom: "A+, A-, O+, O-", percent: "35.7%" },
  { type: "A-", canDonateTo: "A+, A-, AB+, AB-", canReceiveFrom: "A-, O-", percent: "6.3%" },
  { type: "B+", canDonateTo: "B+, AB+", canReceiveFrom: "B+, B-, O+, O-", percent: "8.5%" },
  { type: "B-", canDonateTo: "B+, B-, AB+, AB-", canReceiveFrom: "B-, O-", percent: "1.5%" },
  { type: "AB+", canDonateTo: "AB+", canReceiveFrom: "All Blood Types", percent: "3.4%" },
  { type: "AB-", canDonateTo: "AB+, AB-", canReceiveFrom: "A-, B-, AB-, O-", percent: "0.6%" },
  { type: "O+", canDonateTo: "A+, B+, AB+, O+", canReceiveFrom: "O+, O-", percent: "37.4%" },
  { type: "O-", canDonateTo: "All Blood Types", canReceiveFrom: "O-", percent: "6.6%" },
];

const organTypes = [
  { name: "Kidney", waitingList: "90,000+", avgWaitTime: "3-5 years" },
  { name: "Liver", waitingList: "12,000+", avgWaitTime: "1-3 years" },
  { name: "Heart", waitingList: "3,500+", avgWaitTime: "6 months" },
  { name: "Lungs", waitingList: "1,500+", avgWaitTime: "4-6 months" },
];

const DonationTypes = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 sm:text-4xl">
            Blood & Organ Donation
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Learn about different blood types compatibility and organ donation needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Blood Types */}
          <div>
            <div className="flex items-center mb-6">
              <Drop className="h-6 w-6 text-blood mr-2" />
              <h3 className="text-2xl font-bold text-gray-900">Blood Types</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {bloodTypes.map((blood) => (
                <Card key={blood.type} className="card-hover">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-3xl font-bold text-blood">{blood.type}</CardTitle>
                    <CardDescription>{blood.percent} of population</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      <p><span className="font-semibold">Can donate to:</span> {blood.canDonateTo}</p>
                      <p><span className="font-semibold">Can receive from:</span> {blood.canReceiveFrom}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Organ Donation */}
          <div>
            <div className="flex items-center mb-6">
              <Heart className="h-6 w-6 text-blood mr-2" />
              <h3 className="text-2xl font-bold text-gray-900">Organ Donation</h3>
            </div>
            <p className="mb-6 text-gray-600">
              One organ donor can save up to 8 lives. Register as an organ donor today and give someone a second chance at life.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {organTypes.map((organ) => (
                <Card key={organ.name} className="card-hover">
                  <CardHeader>
                    <CardTitle>{organ.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><span className="font-semibold">Waiting List:</span> {organ.waitingList}</p>
                      <p><span className="font-semibold">Avg. Wait Time:</span> {organ.avgWaitTime}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationTypes;
