import { hashPassword } from "./password";

async function main() {
  const password = "Test@1234";

  const hash = await hashPassword(password);

  console.log("Password:", password);
  console.log("Hash:", hash);
}

main();