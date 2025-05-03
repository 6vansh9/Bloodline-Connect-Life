
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Define types for BloodType and OrganType
type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
type OrganType = "Kidney" | "Liver" | "Heart" | "Lungs";

const FindDonor = () => {
  const [name, setName] = useState("");
  const [bloodType, setBloodType] = useState<BloodType | undefined>(undefined);
  const [organType, setOrganType] = useState<OrganType | undefined>(undefined);
  const [location, setLocation] = useState("");
  const [dateNeeded, setDateNeeded] = useState<Date | undefined>(undefined);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted", {
      name,
      bloodType,
      organType,
      location,
      dateNeeded,
    });
  };

  return (
    <div className="container py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Find a Donor</CardTitle>
          <CardDescription>
            Enter your needs to find potential donors.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Patient Name</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select onValueChange={(value) => setBloodType(value as BloodType)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a blood type" />
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
            <div>
              <Label htmlFor="organType">Organ Needed</Label>
              <Select onValueChange={(value) => setOrganType(value as OrganType)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an organ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kidney">Kidney</SelectItem>
                  <SelectItem value="Liver">Liver</SelectItem>
                  <SelectItem value="Heart">Heart</SelectItem>
                  <SelectItem value="Lungs">Lungs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <Label>Date Needed</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateNeeded && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateNeeded ? (
                      dateNeeded?.toLocaleDateString()
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateNeeded}
                    onSelect={setDateNeeded}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FindDonor;
