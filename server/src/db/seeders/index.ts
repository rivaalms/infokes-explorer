import { execute as executeFilesSeeder } from "./files"

async function run() {
   try {
      await Promise.all([executeFilesSeeder()])
      console.log("🌱 Seeders executed")
   } catch (e) {
      console.error("🌱 Seeders failed:", e)
      process.exit(1)
   } finally {
      process.exit(0)
   }
}

run()
