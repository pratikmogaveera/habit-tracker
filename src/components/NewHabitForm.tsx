"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { NewHabitFormSchema } from "@/lib/forms";
import { insertNewHabitMutation } from "@/lib/queryFunctions";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar1Icon, CalendarIcon, Crosshair, Goal, InfinityIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const NewHabitForm = () => {
  const form = useForm<z.infer<typeof NewHabitFormSchema>>({
    resolver: zodResolver(NewHabitFormSchema),
    defaultValues: {
      userId: "1", // For testing
      title: "",
      description: "",
      targetDays: "1",
      goalType: "target",
    },
  });
  const [habitType, setHabitType] = useState<"ongoing" | "goal_based" | "">("ongoing");
  const [goalType, setGoalType] = useState<"target" | "end_date" | "">("target");
  const yesterday = new Date();
  yesterday.setHours(0, 0, 0);
  yesterday.setDate(yesterday.getDate() - 1);

  const queryClient = useQueryClient();

  const createHabitMutation = useMutation({
    mutationFn: insertNewHabitMutation,
    onSuccess: (data) => {
      alert(data.message || "Habit created successfully!");
      form.reset(); // Reset the form after success
      queryClient.invalidateQueries({
        queryKey: ["habits"],
        exact: true,
      }); // Refresh user list
    },
    onError: (error) => {
      console.error("Error creating habit:", error.message);
    },
  });

  const onSubmit = async (values: z.infer<typeof NewHabitFormSchema>) => {
    createHabitMutation.mutate(values);
  };

  const customHabitTypeChange = (fieldName: keyof z.infer<typeof NewHabitFormSchema>, value: "ongoing" | "goal_based") => {
    form.setValue(fieldName, value, { shouldValidate: true });
    form.resetField("targetDays");
    form.resetField("endDate");
    setHabitType(value);
  };

  const customGoalTypeChange = (fieldName: keyof z.infer<typeof NewHabitFormSchema>, value: "target" | "end_date") => {
    form.setValue(fieldName, value, { shouldValidate: true });
    form.resetField("targetDays");
    form.resetField("endDate");
    setGoalType(value);
  };

  return (
    <div className="p-4 w-full md:max-w-[320px] rounded-xl border text-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-xl font-semibold">Insert New User:</h2>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Habit Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe this habit" maxLength={128} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="habitType"
            render={() => {
              return (
                <FormItem className="space-y-3">
                  <FormLabel>Habit Type</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      defaultValue="ongoing"
                      onValueChange={(value) => customHabitTypeChange("habitType", value as "ongoing" | "goal_based")}
                      className="w-full border-2 rounded-lg"
                    >
                      <ToggleGroupItem value="ongoing" aria-label="Toggle bold" className="w-full h-fit py-2">
                        <div className="flex flex-col gap-2 items-center">
                          <InfinityIcon style={{ height: 32, width: 32 }} />
                          <span>Ongoing</span>
                        </div>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="goal_based" aria-label="Toggle italic" className="w-full h-fit py-2">
                        <div className="flex flex-col gap-2 items-center">
                          <Goal style={{ height: 32, width: 32 }} />
                          <span>Goal Based</span>
                        </div>
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < yesterday} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {habitType === "goal_based" && (
            <FormField
              control={form.control}
              name="goalType"
              render={() => {
                return (
                  <FormItem className="space-y-3">
                    <FormLabel>Goal Type</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        defaultValue="target"
                        onValueChange={(value) => customGoalTypeChange("goalType", value as "target" | "end_date")}
                        className="w-full border-2 rounded-lg"
                      >
                        <ToggleGroupItem value="target" aria-label="Toggle bold" className="w-full h-fit py-2">
                          <div className="flex flex-col gap-2 items-center">
                            <Crosshair style={{ height: 32, width: 32 }} />
                            <span>Target</span>
                          </div>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="end_date" aria-label="Toggle italic" className="w-full h-fit py-2">
                          <div className="flex flex-col gap-2 items-center">
                            <Calendar1Icon style={{ height: 32, width: 32 }} />
                            <span>End Date</span>
                          </div>
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}
          {habitType === "goal_based" && goalType === "target" && (
            <FormField
              control={form.control}
              name="targetDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Days</FormLabel>
                  <FormControl>
                    <Input placeholder="1" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {habitType === "goal_based" && goalType === "end_date" && (
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date <= new Date(form.getValues("startDate"))} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" disabled={createHabitMutation.isPending} className="w-full font-medium leading-none">
            {createHabitMutation.isPending ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Creating new habit...
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

export default NewHabitForm;
