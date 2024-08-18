import { z } from "zod";

export const categorySchema = z.object({
    title: z.string({ required_error: "Category name is required." }),
    heading: z.string({ required_error: "Category heading is required." }),
    description: z.string({ required_error: "Category description is required." }),
    imageUrl: z.string({ required_error: "Category image url is required." }),
})