import { pgEnum } from "drizzle-orm/pg-core";
import { habits, users } from "./schema";

export type NewUserType = typeof users.$inferInsert;

export type NewHabitType = typeof habits.$inferInsert;

export const habitTypeEnum = pgEnum("habit_type", ["ongoing", "goal_based"]);
export const goalTypeEnum = pgEnum("goal_type", ["target", "end_date"]);
