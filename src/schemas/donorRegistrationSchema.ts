
import * as z from "zod";

export const donorFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().regex(/^(\+?\d{1,4}?)?\d{7,14}$/, {
    message: "Please enter a valid phone number.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zipCode: z.string().regex(/^\d{5}(?:[-\s]\d{4})?$/, {
    message: "Please enter a valid ZIP code.",
  }),
  bloodType: z.string().refine((value) => value !== "", {
    message: "Please select a blood type.",
  }),
  organDonation: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export type DonorFormData = z.infer<typeof donorFormSchema>;

export type BloodType =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-"
  | "";
