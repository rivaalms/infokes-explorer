import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"
import { fileC } from "./http/controllers/files"

const port = process.env.SERVER_PORT ?? 3000
const app = new Elysia({
   prefix: "/api",
   normalize: true,
})
   .use(
      cors()
   )
   .get("/files", () => fileC.get())
   .listen(port)

console.log(
   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
