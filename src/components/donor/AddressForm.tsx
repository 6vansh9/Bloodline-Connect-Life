
import React from "react";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DonorFormData } from "@/schemas/donorRegistrationSchema";

interface AddressFormProps {
  control: Control<DonorFormData>;
}

const AddressForm: React.FC<AddressFormProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input placeholder="123 Main St" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex space-x-4">
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Anytown" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="state"
          render={({ field }) => (
            <FormItem className="w-1/4">
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="CA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="zipCode"
          render={({ field }) => (
            <FormItem className="w-1/4">
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input placeholder="12345" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AddressForm;
