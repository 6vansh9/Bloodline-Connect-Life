
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, CircleCheck, CircleX, HelpCircle } from "lucide-react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { BloodType } from "@/utils/donorUtils";

const bloodTypes: BloodType[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const eligibilitySchema = z.object({
  bloodType: z.enum(bloodTypes).optional(),
  lastDonation: z.date().optional(),
  weight: z.enum(["below50kg", "above50kg"]).optional(),
  age: z.enum(["below18", "18to65", "above65"]).optional(),
  healthIssues: z.array(z.string()).optional(),
});

const commonHealthIssues = [
  { id: "diabetes", label: "Diabetes" },
  { id: "hypertension", label: "Hypertension (High Blood Pressure)" },
  { id: "anemia", label: "Anemia or Iron Deficiency" },
  { id: "hepatitis", label: "Hepatitis B or C" },
  { id: "hiv", label: "HIV/AIDS" },
  { id: "pregnancy", label: "Currently Pregnant" },
  { id: "surgery", label: "Recent Surgery (within 6 months)" },
  { id: "medications", label: "On Blood Thinning Medications" },
  { id: "cancer", label: "Cancer History" },
  { id: "tattoo", label: "Recent Tattoo or Piercing (within 3 months)" },
];

const faqItems = [
  {
    question: "How often can I donate blood?",
    answer: "Whole blood donation can be done every 56 days (8 weeks). Platelet donation can be done every 7 days up to 24 times a year. Plasma donation can be done every 28 days, and double red cell donation every 112 days."
  },
  {
    question: "Does donating blood hurt?",
    answer: "You might feel a slight pinch when the needle is inserted, but most donors report minimal discomfort. The actual donation process is relatively painless."
  },
  {
    question: "How long does a blood donation take?",
    answer: "The entire process takes about 1 hour, with the actual blood donation taking only about 8-10 minutes. This includes registration, mini-physical, donation, and refreshments afterward."
  },
  {
    question: "How much blood is taken during a donation?",
    answer: "A typical whole blood donation is about 1 pint (about 500 ml), which is about 10% of your total blood volume. Your body replaces the fluid within 24 hours and the red blood cells within 4-6 weeks."
  },
  {
    question: "Can I donate if I'm taking medication?",
    answer: "Many medications do not prevent you from donating blood. Common medications like blood pressure medicine, birth control pills, and over-the-counter pain relievers typically don't disqualify you. However, some medications may require a waiting period. It's best to inform the donation center about any medications you're taking."
  },
  {
    question: "What's the process for becoming an organ donor?",
    answer: "Register with your state's organ donor registry, which can often be done when renewing your driver's license. Also, share your decision with family members so they are aware of your wishes."
  },
];

interface EligibilityResult {
  eligible: boolean;
  reasons: string[];
}

const Eligibility = () => {
  const [result, setResult] = useState<EligibilityResult | null>(null);
  
  const form = useForm<z.infer<typeof eligibilitySchema>>({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      healthIssues: [],
    },
  });

  const onSubmit = (values: z.infer<typeof eligibilitySchema>) => {
    console.log(values);
    const reasons: string[] = [];
    let eligible = true;
    
    // Check age
    if (values.age === "below18") {
      eligible = false;
      reasons.push("You must be at least 18 years old to donate blood.");
    } else if (values.age === "above65") {
      reasons.push("Donors above 65 may require additional health screening.");
    }
    
    // Check weight
    if (values.weight === "below50kg") {
      eligible = false;
      reasons.push("Donors must weigh at least 50kg (110 lbs) to donate blood.");
    }
    
    // Check last donation
    if (values.lastDonation) {
      const today = new Date();
      const daysSinceLastDonation = Math.floor((today.getTime() - values.lastDonation.getTime()) / (1000 * 3600 * 24));
      
      if (daysSinceLastDonation < 56) {
        eligible = false;
        reasons.push(`Your last donation was ${daysSinceLastDonation} days ago. You need to wait 56 days between whole blood donations.`);
      }
    }
    
    // Check health issues
    if (values.healthIssues && values.healthIssues.length > 0) {
      const severeIssues = ["hiv", "hepatitis", "cancer"];
      const temporaryIssues = ["pregnancy", "surgery", "tattoo", "anemia"];
      
      const hasSevereIssues = values.healthIssues.some(issue => severeIssues.includes(issue));
      const hasTemporaryIssues = values.healthIssues.some(issue => temporaryIssues.includes(issue));
      
      if (hasSevereIssues) {
        eligible = false;
        reasons.push("Some of your health conditions might permanently affect your eligibility to donate blood.");
      }
      
      if (hasTemporaryIssues) {
        eligible = false;
        reasons.push("Some of your health conditions might temporarily affect your eligibility to donate blood.");
      }
      
      if (values.healthIssues.includes("medications")) {
        reasons.push("Please consult with donation center staff about your medications before donating.");
      }
    }
    
    setResult({
      eligible,
      reasons: reasons.length > 0 ? reasons : ["You appear to be eligible to donate blood!"],
    });
    
    if (eligible) {
      toast.success("Good news! You appear eligible to donate blood.");
    } else {
      toast.error("There are factors that may affect your eligibility to donate.");
    }
  };

  return (
    <div className="container py-12 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold mb-4">Eligibility Checker</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Check if you are eligible to donate blood or organs based on your health and donation history.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Blood Donation Eligibility</CardTitle>
              <CardDescription>
                Answer a few questions to check if you're eligible to donate blood
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="bloodType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What is your blood type? (Optional)</FormLabel>
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
                    name="lastDonation"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>When was your last blood donation? (If applicable)</FormLabel>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What is your weight?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your weight range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="below50kg">Less than 50kg (110 lbs)</SelectItem>
                              <SelectItem value="above50kg">50kg (110 lbs) or more</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What is your age?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your age range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="below18">Under 18 years</SelectItem>
                              <SelectItem value="18to65">18-65 years</SelectItem>
                              <SelectItem value="above65">Over 65 years</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="healthIssues"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Do you have any of the following health conditions?</FormLabel>
                          <FormDescription>
                            Select all that apply.
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {commonHealthIssues.map((issue) => (
                            <FormField
                              key={issue.id}
                              control={form.control}
                              name="healthIssues"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={issue.id}
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(issue.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), issue.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== issue.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {issue.label}
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

                  <Button type="submit" className="w-full">
                    Check Eligibility
                  </Button>
                </form>
              </Form>

              {result && (
                <div className="mt-8">
                  <Separator className="my-4" />
                  <div className={cn(
                    "p-6 rounded-lg",
                    result.eligible ? "bg-green-50" : "bg-red-50"
                  )}>
                    <div className="flex items-center">
                      {result.eligible ? (
                        <CircleCheck className="h-8 w-8 text-green-500 mr-3" />
                      ) : (
                        <CircleX className="h-8 w-8 text-red-500 mr-3" />
                      )}
                      <h3 className={cn(
                        "text-lg font-medium",
                        result.eligible ? "text-green-800" : "text-red-800"
                      )}>
                        {result.eligible ? "Eligible to Donate" : "Some Eligibility Concerns"}
                      </h3>
                    </div>
                    <div className="mt-4 space-y-2">
                      {result.reasons.map((reason, index) => (
                        <p key={index} className={cn(
                          "flex items-start",
                          result.eligible ? "text-green-700" : "text-red-700"
                        )}>
                          <span className="mr-2">•</span>
                          {reason}
                        </p>
                      ))}
                    </div>
                    <div className="mt-4 text-gray-600 text-sm">
                      <p className="flex items-center">
                        <HelpCircle className="h-4 w-4 mr-1" />
                        This is an initial assessment. Final eligibility will be determined by donation center staff.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Requirements</CardTitle>
                <CardDescription>
                  Basic requirements for blood donation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blood-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blood font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Age</p>
                    <p className="text-sm text-gray-600">Must be at least 18 years old (16-17 may donate with parental consent in some states)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blood-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blood font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Weight</p>
                    <p className="text-sm text-gray-600">Must weigh at least 50kg (110 lbs)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blood-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blood font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Health</p>
                    <p className="text-sm text-gray-600">Must be in good health and feeling well on donation day</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blood-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blood font-bold">4</span>
                  </div>
                  <div>
                    <p className="font-medium">Frequency</p>
                    <p className="text-sm text-gray-600">Must wait at least 56 days between whole blood donations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eligibility;
