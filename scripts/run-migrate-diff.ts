import "dotenv/config";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const diff = execSync(
  "npx prisma migrate diff --from-migrations prisma/migrations --to-schema prisma/schema.prisma --script",
  { encoding: "utf8", cwd: process.cwd() }
);

writeFileSync("scripts/migration-diff.sql", diff);
console.log(diff);
