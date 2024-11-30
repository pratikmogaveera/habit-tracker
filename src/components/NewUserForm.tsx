"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewUserFormSchema } from "@/lib/forms";
import { insertNewUserMutation } from "@/lib/queryFunctions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
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
    mutationFn: insertNewUserMutation,
    onSuccess: () => {
      form.reset(); // Reset the form after success
      queryClient.invalidateQueries({
        queryKey: ["users"],
        exact: true,
      }); // Refresh user list
    },
    onError: (error) => {
      console.error("Error adding user:", error.message);
    },
  });

  const onSubmit = async (values: z.infer<typeof NewUserFormSchema>) => {
    createUserMutation.mutate(values);
  };

  return (
    <div className="p-4 w-full md:max-w-[320px] rounded-xl border text-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-xl font-semibold">Insert New User:</h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
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

          <Button type="submit" disabled={createUserMutation.isPending} className="w-full font-medium leading-none">
            {createUserMutation.isPending ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Creating new user...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewUserForm;
