"use client";
import { getAllHabitsQuery } from "@/lib/queryFunctions";
import { useQuery } from "@tanstack/react-query";

const UsersList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["habits"],
    queryFn: getAllHabitsQuery,
  });

  if (isLoading) return <p>Loading habits...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4 w-full md:max-w-[320px] rounded-2xl border space-y-4 overflow-scroll">
      <h2 className="text-xl font-semibold">Habits List:</h2>
      <pre className="text-xs w-full overflow-x-scroll">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default UsersList;
