import { insertUser } from "@/db/queries";
import { NewUserType } from "@/db/types";

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
