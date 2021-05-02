import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateListItem = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateListItem),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const listItem = await db.listItem.update({ where: { id }, data: data as any })

    return listItem
  }
)
