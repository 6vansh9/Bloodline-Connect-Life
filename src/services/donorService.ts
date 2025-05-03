
import { DonorFormData } from "../schemas/donorRegistrationSchema";

// This function simulates an API call
export const submitDonorData = async (data: DonorFormData) => {
  // Simulate API request delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Form submitted with data:", data);
  return data;
};
