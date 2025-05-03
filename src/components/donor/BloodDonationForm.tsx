
import { useState } from "react";
import { Droplet } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const BloodDonationForm = () => {
  const [isBloodDonor, setIsBloodDonor] = useState(true);
  const [availableForEmergency, setAvailableForEmergency] = useState(false);
  const { toast } = useToast();

  const handleUpdateBloodSettings = () => {
    // In a real app, this would save to a database
    toast({
      title: "Blood donation settings updated",
      description: "Your blood donation preferences have been saved.",
    });
  };

  return (
    <div className="space-y-4 my-6 border rounded-md p-4 bg-blood-50/20">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Droplet className="h-5 w-5 text-blood" />
          <h3 className="font-medium text-lg">Blood Donation</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Update your blood donation preferences and availability
        </p>
        
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox
            id="isBloodDonor"
            checked={isBloodDonor}
            onCheckedChange={(checked) => setIsBloodDonor(checked as boolean)}
          />
          <label
            htmlFor="isBloodDonor"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I want to be a blood donor
          </label>
        </div>

        {isBloodDonor && (
          <>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="emergencyAvailable"
                checked={availableForEmergency}
                onCheckedChange={(checked) => setAvailableForEmergency(checked as boolean)}
              />
              <label
                htmlFor="emergencyAvailable"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I'm available for emergency donations
              </label>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium">Donation Frequency</label>
              <Select defaultValue="quarterly">
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="biannually">Twice a year</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="emergency">Emergency only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        
        <Button 
          onClick={handleUpdateBloodSettings} 
          className="mt-4 w-full" 
          variant="outline"
        >
          Save Blood Donation Settings
        </Button>
      </div>
    </div>
  );
};

export default BloodDonationForm;
