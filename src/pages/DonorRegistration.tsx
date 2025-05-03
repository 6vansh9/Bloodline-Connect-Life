
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { BloodType, OrganType } from "@/utils/donorUtils";

const bloodTypes: BloodType[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const organTypes: OrganType[] = [
  "Kidney",
  "Liver",
  "Heart",
  "Lungs",
  "Pancreas",
  "Intestines",
  "Corneas",
  "Tissue",
];

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.date({
    required_error: "Please select your date of birth",
  }),
  bloodType: z.enum(bloodTypes),
  lastDonationDate: z.date().optional(),
  city: z.string().min(2, "City name must be at least 2 characters"),
  state: z.string().min(2, "State name must be at least 2 characters"),
  organDonor: z.boolean().default(false),
  organs: z.array(z.string()).optional(),
  medicalConditions: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

const DonorRegistration = () => {
  const [step, setStep] = useState(1);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      organDonor: false,
      medicalConditions: "",
      acceptTerms: false,
    },
  });

  const { watch } = form;
  const organDonor = watch("organDonor");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("Registration successful! Thank you for becoming a donor.");
    // In a real app, we would send this data to the backend
  };

  const nextStep = async () => {
    let fieldsToValidate: string[] = [];
    
    if (step === 1) {
      fieldsToValidate = ["firstName", "lastName", "email", "phone", "dateOfBirth"];
    } else if (step === 2) {
      fieldsToValidate = ["bloodType", "city", "state"];
    }
    
    const result = await form.trigger(fieldsToValidate as any);
    if (result) setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="py-12 container max-w-4xl animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold mb-4">Become a Donor</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Register as a blood or organ donor and help save lives. Your donation can make a difference.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Donor Registration</CardTitle>
              <CardDescription>
                {step === 1
                  ? "Please provide your personal details"
                  : step === 2
                  ? "Medical information and location"
                  : "Review and confirm your information"}
              </CardDescription>
            </div>
            <div className="flex space-x-1">
              <div className={`h-2 w-12 rounded-full ${step >= 1 ? "bg-blood" : "bg-gray-200"}`}></div>
              <div className={`h-2 w-12 rounded-full ${step >= 2 ? "bg-blood" : "bg-gray-200"}`}></div>
              <div className={`h-2 w-12 rounded-full ${step >= 3 ? "bg-blood" : "bg-gray-200"}`}></div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="bloodType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your blood type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {bloodTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastDonationDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Last Blood Donation Date (if applicable)</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Select date (if applicable)</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your state" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="organDonor"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Register as an Organ Donor</FormLabel>
                          <p className="text-sm text-gray-500">
                            I want to register as an organ donor in addition to being a blood donor
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />

                  {organDonor && (
                    <FormField
                      control={form.control}
                      name="organs"
                      render={() => (
                        <FormItem>
                          <FormLabel>Preferred Organs to Donate</FormLabel>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {organTypes.map((organ) => (
                              <FormField
                                key={organ}
                                control={form.control}
                                name="organs"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={organ}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(organ)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...(field.value || []), organ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== organ
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {organ}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="medicalConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical Conditions (if any)</FormLabel>
                        <FormControl>
                          <Input placeholder="List any relevant medical conditions" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Full Name</p>
                        <p>{form.getValues("firstName")} {form.getValues("lastName")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p>{form.getValues("email")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p>{form.getValues("phone")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                        <p>{form.getValues("dateOfBirth") ? format(form.getValues("dateOfBirth"), "PPP") : "Not provided"}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium">Donation Information</h3>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Blood Type</p>
                        <p>{form.getValues("bloodType")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Last Donation</p>
                        <p>{form.getValues("lastDonationDate") ? format(form.getValues("lastDonationDate"), "PPP") : "No previous donations"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p>{form.getValues("city")}, {form.getValues("state")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Organ Donor</p>
                        <p>{form.getValues("organDonor") ? "Yes" : "No"}</p>
                      </div>
                    </div>
                    {form.getValues("organDonor") && form.getValues("organs")?.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-500">Organs for Donation</p>
                        <p>{form.getValues("organs")?.join(", ")}</p>
                      </div>
                    )}
                    {form.getValues("medicalConditions") && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-500">Medical Conditions</p>
                        <p>{form.getValues("medicalConditions")}</p>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Accept Terms and Conditions</FormLabel>
                          <p className="text-sm text-gray-500">
                            I agree to the terms of service and privacy policy. I understand that my information will be used to match me with donation requests.
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                <div className="ml-auto">
                  {step < 3 ? (
                    <Button type="button" onClick={nextStep}>
                      Next
                    </Button>
                  ) : (
                    <Button 
                      type="submit"
                      disabled={!form.getValues("acceptTerms")}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" /> Register as Donor
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonorRegistration;
