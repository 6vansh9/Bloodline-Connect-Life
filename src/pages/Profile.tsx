
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BloodType, OrganType } from "@/utils/donorUtils";
import { User, Heart, Droplet, Shield } from "lucide-react";
import BloodDonationForm from "@/components/donor/BloodDonationForm";
import OrganDonationForm from "@/components/donor/OrganDonationForm";
import { useForm } from "react-hook-form";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    bloodType: "O+" as BloodType,
    isDonor: true,
    isOrganDonor: true,
    organs: ["Kidney", "Liver"] as OrganType[],
    lastDonation: "2023-12-15"
  });
  
  const { toast } = useToast();
  const form = useForm();
  const [isOrganDonor, setIsOrganDonor] = useState(userData.isOrganDonor);
  
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    setIsLoading(false);
    
    // In a real app, we would fetch user data here
  }, []);

  const handleUpdateProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[80vh]">
        <div className="w-8 h-8 border-4 border-t-blood rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="profile" className="flex-1">
            <User className="mr-2 h-4 w-4" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="blood" className="flex-1">
            <Droplet className="mr-2 h-4 w-4" />
            Blood Donation
          </TabsTrigger>
          <TabsTrigger value="organ" className="flex-1">
            <Heart className="mr-2 h-4 w-4" />
            Organ Donation
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex-1">
            <Shield className="mr-2 h-4 w-4" />
            Privacy
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details here
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <div className="p-2 border rounded mt-1">{userData.firstName}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <div className="p-2 border rounded mt-1">{userData.lastName}</div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="p-2 border rounded mt-1">{userData.email}</div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button onClick={handleUpdateProfile}>Update Profile</Button>
              <Button variant="destructive" onClick={handleLogout}>Logout</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="blood">
          <Card>
            <CardHeader>
              <CardTitle>Blood Donation Status</CardTitle>
              <CardDescription>
                Manage your blood donation preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Blood Type</label>
                  <div className="p-2 border rounded mt-1 font-semibold text-blood">{userData.bloodType}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Donor Status</label>
                  <div className="p-2 border rounded mt-1">
                    {userData.isDonor ? (
                      <span className="text-green-600 font-medium">Active Donor</span>
                    ) : (
                      <span className="text-muted-foreground">Not a donor</span>
                    )}
                  </div>
                </div>
                {userData.isDonor && (
                  <div>
                    <label className="text-sm font-medium">Last Donation</label>
                    <div className="p-2 border rounded mt-1">{userData.lastDonation}</div>
                  </div>
                )}
                <BloodDonationForm />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="organ">
          <Card>
            <CardHeader>
              <CardTitle>Organ Donation Status</CardTitle>
              <CardDescription>
                Manage your organ donation preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrganDonationForm 
                control={form.control}
                isOrganDonor={isOrganDonor}
                setIsOrganDonor={setIsOrganDonor}
              />
              
              {isOrganDonor && userData.organs && userData.organs.length > 0 && (
                <div className="mt-4">
                  <label className="text-sm font-medium">Currently registered organs:</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData.organs.map((organ) => (
                      <div 
                        key={organ} 
                        className="flex items-center bg-blood-100 px-3 py-1 rounded-full text-sm"
                      >
                        {organ}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Manage your privacy settings and data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your data is kept private and only shared with medical professionals when needed for donation purposes.
              </p>
              <Button variant="outline">Download My Data</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
