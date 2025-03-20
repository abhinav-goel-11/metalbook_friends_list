import { z } from "zod";

export const addFriendFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name must not exceed 50 characters.",
    })
    .regex(/^[A-Za-z]+$/, { message: "Name must contain only alphabets" }),
});

export type AddFriendFormT = z.infer<typeof addFriendFormSchema>;
