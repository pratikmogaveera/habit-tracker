import { z } from "zod";

export const NewUserFormSchema = z.object({
  name: z.string().min(6).max(30),
  email: z.string().email(),
});

export const NewHabitFormSchema = z.object({
  userId: z.string(),
  title: z.string().min(3).max(50),
  description: z.string().optional(),
  habitType: z.union([z.literal("ongoing"), z.literal("goal_based")]),
  goalType: z.union([z.literal("target"), z.literal("end_date")]),
  startDate: z.date(),
  targetDays: z.string().optional(),
  endDate: z.date().optional(),
  isActive: z.boolean().default(true),
});
