import { boolean, date, integer, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { habitTypeEnum, goalTypeEnum } from "./types";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(users.id),
    };
  }
);

export const habits = pgTable("habits", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  userId: integer("user_id").notNull(),
  description: text("description"),
  habitType: habitTypeEnum("habit_type").notNull(),
  goalType: goalTypeEnum("goal_type").notNull(),
  startDate: date("start_date").notNull(),
  targetDays: integer("target_days"),
  endDate: date("end_date"),
  isActive: boolean("is_active").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
