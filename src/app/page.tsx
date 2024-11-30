import UsersList from "@/components/UsersList";
import NewUserForm from "@/components/NewUserForm";

export default function Home() {
  return (
    <main className="grid place-items-center min-h-dvh w-screen max-w-[100vw] p-5 md:p-8 lg:p-10">
      <div className="flex flex-col items-center space-y-8">
        <NewUserForm />
        <UsersList />
      </div>
    </main>
  );
}
