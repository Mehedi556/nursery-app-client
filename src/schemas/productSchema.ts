import { z } from "zod";

export const productSchema = z.object({
    title: z.string({ required_error: "Product name is required." }),
    category: z.string({ required_error: "Select any category." }),
    price: z.number({ required_error: "Product price is required." }),
    quantity: z.number({ required_error: "Product Stock/Quantity is required." }),
    rating: z.number({ required_error: "Product rating is required." }),
    description: z.string({ required_error: "Product description is required." }),
    image: z.string({ required_error: "Product image url is required." }),
})