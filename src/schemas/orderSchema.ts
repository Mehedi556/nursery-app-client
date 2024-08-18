import { z } from "zod";

export const orderSchema = z.object({
  name: z.string({required_error: "Your name is required."}),

  phone: z.string({required_error: "Phone number is required."}),

  email: z.string({required_error: "Email is required."}),

  address: z.string({required_error: "Address is required."}).min(1, "Address cannot be empty."),
});