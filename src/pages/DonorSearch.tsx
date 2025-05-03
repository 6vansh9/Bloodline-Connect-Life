
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SearchIcon, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BloodType, 
  OrganType, 
  DonorProfile, 
  filterCompatibleDonors, 
  mockDonors 
} from "@/utils/donorUtils";

const searchSchema = z.object({
  bloodType: z.string().optional(),
  organType: z.string().optional(),
  location: z.string().min(1, { message: "Please enter a location" }),
  maxDistance: z.string().optional(),
});

const DonorSearch = () => {
  const { toast } = useToast();
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<DonorProfile[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      bloodType: undefined,
      organType: undefined,
      location: "",
      maxDistance: "25",
    },
  });

  const onSubmit = async (values: z.infer<typeof searchSchema>) => {
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter donors based on search criteria
      let filteredDonors = [...mockDonors];
      
      // Filter by location
      if (values.location) {
        filteredDonors = filteredDonors.filter(donor => 
          donor.city.toLowerCase().includes(values.location.toLowerCase()) ||
          donor.state.toLowerCase().includes(values.location.toLowerCase())
        );
      }
      
      // Filter by blood type if specified
      if (values.bloodType) {
        filteredDonors = filterCompatibleDonors(
          filteredDonors,
          values.bloodType as BloodType,
          values.location
        );
      }
      
      // Filter by organ type if specified
      if (values.organType) {
        filteredDonors = filteredDonors.filter(donor => 
          donor.organs?.includes(values.organType as OrganType)
        );
      }
      
      // Filter by max distance if specified
      if (values.maxDistance) {
        const maxDist = parseInt(values.maxDistance);
        filteredDonors = filteredDonors.filter(donor => 
          (donor.distance || 0) <= maxDist
        );
      }
      
      setSearchResults(filteredDonors);
      
      toast({
        title: "Search completed",
        description: `Found ${filteredDonors.length} potential donors matching your criteria.`,
      });
    } catch (error) {
      toast({
        title: "Search failed",
        description: "An error occurred while searching for donors.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Find Organ & Blood Donors</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Search our database of willing donors based on blood type, 
            organ needed, and location to find potential matches.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">Search Criteria</CardTitle>
              <CardDescription>
                Fill in your requirements to find matching donors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="organType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organ Needed</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select organ" />
                            </SelectTrigger>
                          </FormControl>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              className="pl-10" 
                              placeholder="City or state"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="maxDistance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Distance (km)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isSearching}>
                    {isSearching ? (
                      "Searching..."
                    ) : (
                      <>
                        <SearchIcon className="mr-2 h-4 w-4" /> Search Donors
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Matching Donors</CardTitle>
                <CardDescription>
                  {hasSearched 
                    ? `Found ${searchResults.length} donors matching your criteria` 
                    : "Use the search form to find potential donors"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSearching ? (
                  <div className="flex justify-center py-8">
                    <div className="text-center">
                      <div className="w-8 h-8 border-4 border-t-blood rounded-full animate-spin mx-auto"></div>
                      <p className="mt-2 text-sm text-muted-foreground">Searching for donors...</p>
                    </div>
                  </div>
                ) : hasSearched && searchResults.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No donors found matching your criteria.</p>
                    <p className="text-sm mt-2">Try broadening your search parameters.</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-4">
                    {searchResults.map((donor) => (
                      <Card key={donor.id} className="overflow-hidden">
                        <div className="p-4 flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{donor.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {donor.city}, {donor.state}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <span className="bg-blood-50 text-blood-900 px-2 py-1 rounded-md text-xs">
                                Blood Type: {donor.bloodType}
                              </span>
                              
                              {donor.organs && donor.organs.length > 0 && (
                                <span className="bg-green-50 text-green-900 px-2 py-1 rounded-md text-xs">
                                  Organ Donor
                                </span>
                              )}
                            </div>
                            
                            {donor.organs && donor.organs.length > 0 && (
                              <div className="mt-2">
                                <p className="text-xs text-muted-foreground">Willing to donate:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {donor.organs.map(organ => (
                                    <span key={organ} className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                                      {organ}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <span className="font-medium text-sm">
                              {donor.distance ? `${donor.distance} km away` : "Distance unknown"}
                            </span>
                          </div>
                        </div>
                        <div className="bg-muted px-4 py-2 flex justify-end">
                          <Button variant="outline" size="sm">
                            Contact
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Use the search form to find potential donors</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorSearch;
