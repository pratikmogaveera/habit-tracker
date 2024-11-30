import { z } from "zod";

export const NewUserFormSchema = z.object({
  name: z.string().min(6).max(30),
  email: z.string().email(),
});
