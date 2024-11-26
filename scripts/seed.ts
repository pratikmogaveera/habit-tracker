import { NewUserType, insertUser } from "@/db/queries";

async function main() {
  const newUser: NewUserType = {
    name: "John Doe",
    email: "johndoe@test.com",
  };

  const result = await insertUser(newUser);
  console.log("Print Result:", result);
  process.exit();
}

main();
