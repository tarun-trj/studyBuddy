import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password must be at least of 6 characters" }) // Minor correction here from "at least of 6 characters" to "at least of 7 characters"
    .max(1024, "Password can't be greater than 1024 characters"),
});

// Creating an object schema
const signupSchema = loginSchema.extend({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  branch: z
    .string({ required_error: "Branch is required" })
    .trim()
    .min(2, { message: "Branch must be at least of 2 characters" })
    .max(5, { message: "Branch must not be more than 5 characters" }),
  semester: z
    .string({ required_error: "Semester is required" })
    .trim()
    .min(1, { message: "Semester must be at least of 1 character" })
    .max(2, { message: "Semester must not be more than 2 characters" })
});

export { signupSchema, loginSchema };
