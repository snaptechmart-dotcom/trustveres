// fix-imports.js
import fs from "fs";
import path from "path";

const targetFolders = ["./app/api"];

function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // WRONG:
  // import connectDB from "@/app/lib/mongodb"
  //
  // RIGHT:
  // import { connectDB } from "@/app/lib/mongodb"

  const wrongImport =
    /import\s+connectDB\s+from\s+["'](@\/app\/lib\/mongodb)["'];?/g;

  const correctImport = `import { connectDB } from "$1";`;

  if (wrongImport.test(content)) {
    console.log("Fixing:", filePath);
    content = content.replace(wrongImport, correctImport);
    fs.writeFileSync(filePath, content, "utf8");
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file === "route.ts" || file === "route.js") {
      fixImportsInFile(fullPath);
    }
  });
}

targetFolders.forEach((folder) => walkDir(folder));

console.log("✅ All imports fixed successfully!");
