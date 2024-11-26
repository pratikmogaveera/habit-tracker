import { db } from "./";
import { users } from "./schema";

export type NewUserType = typeof users.$inferInsert;

export const getAllUsers = async () => {
  const result = await db.select().from(users);
  console.log("Result Select:", result);
  return result;
};

export const insertUser = async (userDetails: NewUserType) => {
  const result = await db.insert(users).values(userDetails).returning();
  console.log("Result Insert:", result);
  return result;
};
