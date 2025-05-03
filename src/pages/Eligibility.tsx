import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Eligibility = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [medications, setMedications] = useState("");
  const [travelHistory, setTravelHistory] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const checkEligibility = () => {
    // Reset eligibility status
    setIsEligible(null);

    // Age validation
    const ageValue = parseInt(age);
    if (isNaN(ageValue) || ageValue < 16 || ageValue > 70) {
      setIsEligible(false);
      return;
    }

    // Weight validation
    const weightValue = parseInt(weight);
    if (isNaN(weightValue) || weightValue < 50) {
      setIsEligible(false);
      return;
    }

    // Medical conditions validation
    if (medicalConditions.toLowerCase().includes("hiv") || medicalConditions.toLowerCase().includes("hepatitis")) {
      setIsEligible(false);
      return;
    }

    // Medications validation
    if (medications.toLowerCase().includes("blood thinners")) {
      setIsEligible(false);
      return;
    }

    // Travel history validation
    if (travelHistory.toLowerCase().includes("malaria")) {
      setIsEligible(false);
      return;
    }

    // If all checks pass, set eligibility to true
    setIsEligible(true);
  };

  return (
    <div className="container py-24">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Check Your Eligibility</CardTitle>
              <CardDescription>
                Answer the following questions to determine your eligibility for
                blood donation.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="age">Age (16-70)</Label>
                <Input
                  type="number"
                  id="age"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="weight">Weight (Minimum 50kg)</Label>
                <Input
                  type="number"
                  id="weight"
                  placeholder="Enter your weight in kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="medicalConditions">Medical Conditions</Label>
                <Input
                  type="text"
                  id="medicalConditions"
                  placeholder="List any medical conditions"
                  value={medicalConditions}
                  onChange={(e) => setMedicalConditions(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="medications">Medications</Label>
                <Input
                  type="text"
                  id="medications"
                  placeholder="List any medications you are taking"
                  value={medications}
                  onChange={(e) => setMedications(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="travelHistory">Travel History</Label>
                <Input
                  type="text"
                  id="travelHistory"
                  placeholder="List any recent travel history"
                  value={travelHistory}
                  onChange={(e) => setTravelHistory(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select onValueChange={setBloodType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <button
                className="bg-blood text-white py-2 rounded-md hover:bg-blood-700 transition-colors"
                onClick={checkEligibility}
              >
                Check Eligibility
              </button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          {isEligible === true && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Congratulations!</CardTitle>
                <CardDescription>
                  Based on your answers, you are likely eligible to donate blood.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Thank you for considering donating blood. Your contribution can
                  save lives.
                </p>
              </CardContent>
            </Card>
          )}

          {isEligible === false && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  We're Sorry, But...
                </CardTitle>
                <CardDescription>
                  Based on your answers, you may not be eligible to donate blood
                  at this time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  There are several factors that can affect your eligibility to
                  donate blood. Please consult with a healthcare professional
                  for more information.
                </p>
              </CardContent>
            </Card>
          )}

          {isEligible === null && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Eligibility Information
                </CardTitle>
                <CardDescription>
                  Please fill out the form to check your eligibility.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Your health and safety, as well as the safety of patients
                  receiving blood transfusions, are our top priorities.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Eligibility;
