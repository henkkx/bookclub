import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetListItem = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetListItem), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const listItem = await db.listItem.findFirst({ where: { id } })

  if (!listItem) throw new NotFoundError()

  return listItem
})
