
import React from "react";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Button
} from "@/components/ui/button";
import {
  FormDescription,
} from "@/components/ui/form";
import { DonorFormData } from "@/schemas/donorRegistrationSchema";

interface AdditionalInfoFormProps {
  control: Control<DonorFormData>;
  isOrganDonor: boolean;
  setIsOrganDonor: (value: boolean) => void;
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({ 
  control, 
  isOrganDonor, 
  setIsOrganDonor 
}) => {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="organDonation"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <div className="space-y-[2px]">
              <FormLabel>Organ Donation</FormLabel>
              <FormDescription>
                Would you like to register as an organ donor?
              </FormDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                setIsOrganDonor(!isOrganDonor);
                field.onChange(!isOrganDonor ? "yes" : "");
              }}
            >
              {isOrganDonor ? "Yes, I'm an organ donor" : "No, thanks"}
            </Button>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="additionalInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Information</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any additional information you would like to share?"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AdditionalInfoForm;
