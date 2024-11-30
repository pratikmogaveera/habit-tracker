"use client";
import { useQuery } from "@tanstack/react-query";

const UsersList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch users.");
      }

      return response.json();
    },
  });

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4 rounded-2xl border space-y-4 overflow-scroll">
      <h2>Users List:</h2>
      <pre className="text-xs max-w-[80vw] overflow-x-scroll">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default UsersList;
