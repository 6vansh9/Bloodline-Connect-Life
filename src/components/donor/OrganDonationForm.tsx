
import { useState } from "react";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Control } from "react-hook-form";
import { Heart } from "lucide-react";

export type OrganType = "Kidney" | "Liver" | "Heart" | "Lungs" | "Pancreas" | "Corneas" | "Tissue" | "";

interface OrganDonationFormProps {
  control: Control<any>;
  isOrganDonor: boolean;
  setIsOrganDonor: (value: boolean) => void;
}

const OrganDonationForm = ({ control, isOrganDonor, setIsOrganDonor }: OrganDonationFormProps) => {
  const [selectedOrgans, setSelectedOrgans] = useState<OrganType[]>([]);

  const handleOrganSelect = (value: OrganType) => {
    if (value && !selectedOrgans.includes(value)) {
      setSelectedOrgans([...selectedOrgans, value]);
    }
  };

  const handleRemoveOrgan = (organ: OrganType) => {
    setSelectedOrgans(selectedOrgans.filter(o => o !== organ));
  };

  return (
    <div className="space-y-4 my-6 border rounded-md p-4 bg-blood-50/20">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-blood" />
          <h3 className="font-medium text-lg">Organ Donation</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Are you willing to be an organ donor? Your decision can save lives.
        </p>
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox
            id="isOrganDonor"
            checked={isOrganDonor}
            onCheckedChange={(checked) => {
              setIsOrganDonor(checked as boolean);
              if (!checked) setSelectedOrgans([]);
            }}
          />
          <label
            htmlFor="isOrganDonor"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Yes, I want to be an organ donor
          </label>
        </div>
      </div>

      {isOrganDonor && (
        <FormField
          control={control}
          name="organs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select organs you're willing to donate</FormLabel>
              <div className="space-y-4">
                <Select 
                  onValueChange={(value) => {
                    handleOrganSelect(value as OrganType);
                    field.onChange([...selectedOrgans, value]);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select organs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kidney">Kidney</SelectItem>
                    <SelectItem value="Liver">Liver</SelectItem>
                    <SelectItem value="Heart">Heart</SelectItem>
                    <SelectItem value="Lungs">Lungs</SelectItem>
                    <SelectItem value="Pancreas">Pancreas</SelectItem>
                    <SelectItem value="Corneas">Corneas</SelectItem>
                    <SelectItem value="Tissue">Tissue</SelectItem>
                  </SelectContent>
                </Select>

                {selectedOrgans.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedOrgans.map((organ) => (
                      <div 
                        key={organ} 
                        className="flex items-center bg-blood-100 px-3 py-1 rounded-full text-sm"
                      >
                        {organ}
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="sm" 
                          className="h-4 w-4 p-0 ml-2"
                          onClick={() => handleRemoveOrgan(organ)}
                        >
                          &times;
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <FormDescription>
                You can select multiple organs that you're willing to donate.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default OrganDonationForm;
