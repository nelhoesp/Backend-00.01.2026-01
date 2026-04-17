import { Router } from "express";
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const cleanFileName = (filename: string) => filename.split(".").shift();

for (const filename of readdirSync(__dirname)) {
  const cleanName = cleanFileName(filename);
  if (cleanName !== "index") {
    const mod = await import(`./${filename}`);
    router.use(`/${cleanName}`, mod.default ?? mod.router);
  }
}

export default router;
