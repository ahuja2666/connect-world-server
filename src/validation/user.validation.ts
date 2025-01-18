import { z } from "zod";
import { CONSTANTS } from "../config/constants";

export const createUserSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "First Name is required", // message if the field is missing entirely
      invalid_type_error: "First Name must be a string", // if it's something else
    }).min(2, "First name should be atleast 2 character")
      .max(20, "First Name should be a maximum of 20 characters"),

    lastName: z.string({
      invalid_type_error: "Last Name must be a string", // if it's something else
    })
      .min(2, "Last name should be at least 2 characters")
      .max(20, "Last Name should be a maximum of 20 characters")
      .optional(), // Make it optional

    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email("Email must be a valid email address")
      .max(20, "Email should be a maximum of 20 characters")
      .refine(
        (val) => {
          const domain = val.split("@")[1] ?? "";
          return CONSTANTS.ALLOWED_DOMAINS.includes(domain.toLowerCase());
        },
        {
          message: `Email domain must be one of: ${CONSTANTS.ALLOWED_DOMAINS.join(", ")}`,
        }
      ),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(8, "Password should be at least 8 characters")
      .max(30, "Password should be a maximum of 30 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
  }),
});

export type CreateUserBody = z.infer<typeof createUserSchema>["body"];