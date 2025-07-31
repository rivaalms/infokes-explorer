import { Elysia } from "elysia"
import { fileC } from "./controllers/files"

const port = process.env.SERVER_PORT ?? 3000
const app = new Elysia({
   prefix: "/api",
   normalize: true,
})
   .get("/files", () => fileC.get() )
   .listen(port)

console.log(
   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
