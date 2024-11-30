import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewUserForm from "./NewUserForm";
import UsersList from "./UsersList";
import NewHabitForm from "./NewHabitForm";

const FormTabs = () => {
  return (
    <div className="w-full md:max-w-[320px]">
      <Tabs defaultValue="user" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="user" className="w-full">
            Create User
          </TabsTrigger>
          <TabsTrigger value="habit" className="w-full">
            Create Habit
          </TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <NewUserForm />
          <UsersList />
        </TabsContent>
        <TabsContent value="habit">
          <NewHabitForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormTabs;
