import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"
import { folderC } from "./http/controllers/folders"
import { fileC } from "./http/controllers/files"

const port = process.env.SERVER_PORT ?? 3000
const app = new Elysia({
   prefix: "/api/v1",
   normalize: true,
})
   .use(cors())
   .get("/folders", () => folderC().get())
   .get("/files", (ctx) => fileC().get({ query: ctx.query }))
   .listen(port)

console.log(
   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
