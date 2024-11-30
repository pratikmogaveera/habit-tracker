"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewUserFormSchema } from "@/lib/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const NewUserForm = () => {
  const form = useForm<z.infer<typeof NewUserFormSchema>>({
    resolver: zodResolver(NewUserFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: async (newUser: z.infer<typeof NewUserFormSchema>) => {
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
    },
    onSuccess: (data) => {
      alert(data.message || "User added successfully!");
      form.reset(); // Reset the form after success
      queryClient.invalidateQueries({
        queryKey: ["users"],
        exact: true,
      }); // Refresh user list
    },
    onError: (error) => {
      console.error("Error adding user:", error.message);
      alert(error.message || "An error occurred. Please try again.");
    },
  });

  const onSubmit = async (values: z.infer<typeof NewUserFormSchema>) => {
    createUserMutation.mutate(values);
  };

  return (
    <div className="p-4 w-full min-w-[300px] md:max-w-[300px] rounded-xl border text-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h2>Insert New User:</h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={createUserMutation.isPending} className="w-full font-semibold">
            {createUserMutation.isPending ? "Creating new user..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewUserForm;
