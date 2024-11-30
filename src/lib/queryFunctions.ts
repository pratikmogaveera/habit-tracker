import { z } from "zod";
import { NewHabitFormSchema, NewUserFormSchema } from "./forms";

export const getAllUsersQuery = async () => {
  const response = await fetch("/api/users", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch users.");
  }

  return response.json();
};

export const insertNewUserMutation = async (newUser: z.infer<typeof NewUserFormSchema>) => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add user.");
  }

  return response.json();
};

export const insertNewHabitMutation = async (newHabit: z.infer<typeof NewHabitFormSchema>) => {
  const response = await fetch("/api/habits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newHabit),
  });

  console.log(newHabit);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add user.");
  }

  return response.json();
};
