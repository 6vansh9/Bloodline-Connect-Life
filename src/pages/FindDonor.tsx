
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Search, MapPin, Phone, Mail } from "lucide-react";
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import DonorMap from "@/components/map/DonorMap";
import { BloodType, DonorProfile, OrganType, filterCompatibleDonors, mockDonors } from "@/utils/donorUtils";

const bloodTypes: BloodType[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const organTypes: OrganType[] = ["Kidney", "Liver", "Heart", "Lungs", "Pancreas", "Intestines", "Corneas", "Tissue"];
const cities = ["San Francisco", "Oakland", "San Jose", "Palo Alto", "Mountain View"];
const states = ["CA"];

const searchSchema = z.object({
  donationType: z.enum(["blood", "organ"]),
  bloodType: z.enum(bloodTypes).optional(),
  organType: z.enum(organTypes).optional(),
  city: z.string().min(1, "Please select a city"),
  state: z.string().min(1, "Please select a state"),
});

type SearchValues = z.infer<typeof searchSchema>;

const FindDonor = () => {
  const [searchResults, setSearchResults] = useState<DonorProfile[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const form = useForm<SearchValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      donationType: "blood",
      city: "",
      state: "",
    },
  });

  const { watch } = form;
  const donationType = watch("donationType");

  const onSubmit = (values: SearchValues) => {
    console.log("Search values:", values);
    setIsSearching(true);
    
    setTimeout(() => {
      let results: DonorProfile[] = [];
      
      if (values.donationType === "blood" && values.bloodType) {
        results = filterCompatibleDonors(mockDonors, values.bloodType, values.city);
      } else if (values.donationType === "organ" && values.organType) {
        results = mockDonors.filter(donor => 
          donor.organs?.includes(values.organType as OrganType) && 
          donor.city.toLowerCase() === values.city.toLowerCase()
        );
      }
      
      setSearchResults(results);
      setIsSearching(false);
      
      if (results.length === 0) {
        toast.warning("No matching donors found. Please try different search criteria.");
      } else {
        toast.success(`Found ${results.length} matching donors!`);
      }
    }, 1500);
  };

  const handleContactDonor = (donor: DonorProfile) => {
    toast.success(`Request sent to ${donor.name}. They will be notified shortly.`);
  };

  return (
    <div className="container py-12 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold mb-4">Find a Donor</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Search for blood or organ donors based on your requirements and location.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Search Criteria</CardTitle>
              <CardDescription>
                Find donors that match your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Tabs 
                    defaultValue="blood" 
                    onValueChange={(value) => form.setValue("donationType", value as "blood" | "organ")}
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="blood">Blood Donor</TabsTrigger>
                      <TabsTrigger value="organ">Organ Donor</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="blood" className="pt-4">
                      <FormField
                        control={form.control}
                        name="bloodType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Blood Type Needed</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select blood type" />
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
                    </TabsContent>
                    
                    <TabsContent value="organ" className="pt-4">
                      <FormField
                        control={form.control}
                        name="organType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organ Type Needed</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select organ type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {organTypes.map((type) => (
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
                    </TabsContent>
                  </Tabs>

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
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
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>Searching...</>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" /> Find Donors
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Donor Map</CardTitle>
              <CardDescription>
                View donors in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <DonorMap />
              </div>
            </CardContent>
          </Card>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Search Results
              {searchResults.length > 0 && (
                <Badge variant="outline" className="ml-2">
                  {searchResults.length} donors found
                </Badge>
              )}
            </h3>
            
            {searchResults.length === 0 ? (
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No donors found</h3>
                <p className="text-gray-600">
                  {isSearching 
                    ? "Searching for donors that match your criteria..." 
                    : "Try adjusting your search criteria to find compatible donors."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((donor) => (
                  <Card key={donor.id} className="card-hover">
                    <CardHeader>
                      <CardTitle className="text-lg">{donor.name}, {donor.age}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant={donationType === "blood" ? "default" : "outline"} className={donationType === "blood" ? "bg-blood" : ""}>
                          {donor.bloodType}
                        </Badge>
                        {donor.organs && donor.organs.length > 0 && (
                          <Badge variant={donationType === "organ" ? "default" : "outline"} className={donationType === "organ" ? "bg-blood" : ""}>
                            Organ Donor
                          </Badge>
                        )}
                        {donor.available && (
                          <Badge variant="outline" className="bg-green-500 text-white border-green-500">
                            Available
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{donor.city}, {donor.state}</span>
                          {donor.distance && (
                            <Badge variant="outline" className="ml-auto">
                              {donor.distance.toFixed(1)} km away
                            </Badge>
                          )}
                        </div>
                        {donor.lastDonation && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>Last donation: {new Date(donor.lastDonation).toLocaleDateString()}</span>
                          </div>
                        )}
                        {donor.organs && donor.organs.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {donor.organs.map((organ) => (
                              <Badge key={organ} variant="outline" className="bg-gray-100">
                                {organ}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Phone className="h-3 w-3" /> Contact
                      </Button>
                      <Button size="sm" className="flex items-center gap-1" onClick={() => handleContactDonor(donor)}>
                        <Mail className="h-3 w-3" /> Send Request
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindDonor;
