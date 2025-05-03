
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type OrganType = 'Kidney' | 'Liver' | 'Heart' | 'Lungs' | 'Pancreas' | 'Intestines' | 'Corneas' | 'Tissue';

export interface DonorProfile {
  id: string;
  name: string;
  age: number;
  bloodType: BloodType;
  organs?: OrganType[];
  lastDonation?: Date;
  city: string;
  state: string;
  available: boolean;
  distance?: number; // in kilometers
}

export interface DonationRequest {
  id: string;
  bloodType?: BloodType;
  organType?: OrganType;
  urgency: 'Normal' | 'Urgent' | 'Critical';
  hospital: string;
  city: string;
  state: string;
  createdAt: Date;
  status: 'Open' | 'Matched' | 'Completed';
}

// Get compatible blood types for receiving blood
export const getCompatibleBloodTypes = (bloodType: BloodType): BloodType[] => {
  switch (bloodType) {
    case 'A+':
      return ['A+', 'A-', 'O+', 'O-'];
    case 'A-':
      return ['A-', 'O-'];
    case 'B+':
      return ['B+', 'B-', 'O+', 'O-'];
    case 'B-':
      return ['B-', 'O-'];
    case 'AB+':
      return ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    case 'AB-':
      return ['A-', 'B-', 'AB-', 'O-'];
    case 'O+':
      return ['O+', 'O-'];
    case 'O-':
      return ['O-'];
  }
};

// Get blood types that can receive the donor's blood
export const canDonateTo = (bloodType: BloodType): BloodType[] => {
  switch (bloodType) {
    case 'A+':
      return ['A+', 'AB+'];
    case 'A-':
      return ['A+', 'A-', 'AB+', 'AB-'];
    case 'B+':
      return ['B+', 'AB+'];
    case 'B-':
      return ['B+', 'B-', 'AB+', 'AB-'];
    case 'AB+':
      return ['AB+'];
    case 'AB-':
      return ['AB+', 'AB-'];
    case 'O+':
      return ['A+', 'B+', 'AB+', 'O+'];
    case 'O-':
      return ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  }
};

// Check if a donor is eligible to donate blood
export const isEligibleToDonateBased = (lastDonation?: Date): boolean => {
  if (!lastDonation) return true;
  
  const today = new Date();
  const daysSinceLastDonation = Math.floor((today.getTime() - lastDonation.getTime()) / (1000 * 3600 * 24));
  
  // Most guidelines suggest waiting 56 days (8 weeks) between whole blood donations
  return daysSinceLastDonation >= 56;
};

// Filter donors based on compatibility and location
export const filterCompatibleDonors = (
  donors: DonorProfile[],
  neededBloodType: BloodType,
  city: string,
): DonorProfile[] => {
  const compatibleTypes = getCompatibleBloodTypes(neededBloodType);
  
  return donors
    .filter((donor) => 
      compatibleTypes.includes(donor.bloodType) && 
      donor.available && 
      isEligibleToDonateBased(donor.lastDonation) &&
      donor.city.toLowerCase() === city.toLowerCase()
    )
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));
};

// Mock data for testing
export const mockDonors: DonorProfile[] = [
  {
    id: '1',
    name: 'John Doe',
    age: 28,
    bloodType: 'O+',
    city: 'San Francisco',
    state: 'CA',
    available: true,
    lastDonation: new Date('2023-01-15'),
    distance: 2.4,
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 35,
    bloodType: 'A-',
    organs: ['Kidney', 'Liver'],
    city: 'San Francisco',
    state: 'CA',
    available: true,
    distance: 3.8,
  },
  {
    id: '3',
    name: 'Michael Johnson',
    age: 42,
    bloodType: 'B+',
    city: 'Oakland',
    state: 'CA',
    available: true,
    lastDonation: new Date('2023-03-10'),
    distance: 5.2,
  },
  {
    id: '4',
    name: 'Sarah Williams',
    age: 30,
    bloodType: 'AB+',
    organs: ['Corneas', 'Tissue'],
    city: 'San Jose',
    state: 'CA',
    available: true,
    distance: 7.5,
  },
  {
    id: '5',
    name: 'Robert Brown',
    age: 45,
    bloodType: 'O-',
    city: 'San Francisco',
    state: 'CA',
    available: true,
    lastDonation: new Date('2023-02-22'),
    distance: 1.8,
  },
];

export const mockRequests: DonationRequest[] = [
  {
    id: '1',
    bloodType: 'A+',
    urgency: 'Urgent',
    hospital: 'UCSF Medical Center',
    city: 'San Francisco',
    state: 'CA',
    createdAt: new Date('2023-06-10'),
    status: 'Open',
  },
  {
    id: '2',
    organType: 'Kidney',
    urgency: 'Critical',
    hospital: 'Stanford Hospital',
    city: 'Palo Alto',
    state: 'CA',
    createdAt: new Date('2023-06-08'),
    status: 'Open',
  },
  {
    id: '3',
    bloodType: 'O-',
    urgency: 'Normal',
    hospital: 'Kaiser Permanente',
    city: 'Oakland',
    state: 'CA',
    createdAt: new Date('2023-06-11'),
    status: 'Matched',
  },
];
