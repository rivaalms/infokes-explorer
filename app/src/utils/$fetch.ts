import { ofetch, type FetchRequest, type FetchOptions } from "ofetch"

export function $fetch<T>(request: FetchRequest, opts?: FetchOptions<"json">) {
   const handler = ofetch.create({
      baseURL: import.meta.env.VITE_API_URL,
      onResponse: ({ response }) => {
         return response._data
      },
   })

   return handler<T, "json">(request, opts)
}
