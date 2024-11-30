import { pgEnum } from "drizzle-orm/pg-core";
import { users } from "./schema";

export type NewUserType = typeof users.$inferInsert;

export const habitTypeEnum = pgEnum("habit_type", ["ongoing", "goal_based"]);
