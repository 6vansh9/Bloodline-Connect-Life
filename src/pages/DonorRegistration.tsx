
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { donorFormSchema, type DonorFormData } from "@/schemas/donorRegistrationSchema";
import { submitDonorData } from "@/services/donorService";
import PersonalInfoForm from "@/components/donor/PersonalInfoForm";
import AddressForm from "@/components/donor/AddressForm";
import BloodTypeForm from "@/components/donor/BloodTypeForm";
import AdditionalInfoForm from "@/components/donor/AdditionalInfoForm";

const DonorRegistration = () => {
  const [isOrganDonor, setIsOrganDonor] = useState(false);

  const form = useForm<DonorFormData>({
    resolver: zodResolver(donorFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      bloodType: "",
      organDonation: "",
      additionalInfo: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: submitDonorData,
    onSuccess: () => {
      toast({
        title: "Registration successful!",
        description: "You are now registered as a donor.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  function onSubmit(values: DonorFormData) {
    mutate(values);
  }

  return (
    <div className="container py-24">
      <div className="grid lg:grid-cols-8">
        <div className="lg:col-span-3">
          <h2 className="text-3xl font-bold tracking-tight">
            Donor Registration
          </h2>
          <p className="text-muted-foreground mt-4">
            Please fill out the form below to register as a blood and/or organ
            donor. Your information will be kept confidential and used only to
            connect you with potential recipients.
          </p>
          <div className="relative h-96 mt-8 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1518623948694-3d57c2c978e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              alt="Donor"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-3xl ml-16"
            >
              <PersonalInfoForm control={form.control} />
              <AddressForm control={form.control} />
              <BloodTypeForm control={form.control} />
              <AdditionalInfoForm 
                control={form.control}
                isOrganDonor={isOrganDonor}
                setIsOrganDonor={setIsOrganDonor}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Register"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DonorRegistration;
