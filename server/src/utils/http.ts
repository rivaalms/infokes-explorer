export function resolveResponse<T>(
   data: T,
   meta?: {
      message?: string
      error?: string
   }
) {
   return {
      meta: {
         success: Boolean(meta?.error),
         message: meta?.message ?? "",
         error: meta?.error ?? "",
      },
      data: data,
   }
}
