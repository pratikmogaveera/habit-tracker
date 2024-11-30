import { db } from "./";
import { users } from "./schema";
import { NewUserType } from "./types";

export const getAllUsers = async () => {
  const result = await db.select().from(users);
  return result;
};

export const insertUser = async (userDetails: NewUserType) => {
  const result = await db.insert(users).values(userDetails).returning();
  return result;
};
