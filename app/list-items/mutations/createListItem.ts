import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateListItem = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(CreateListItem),
  resolver.authorize(),
  async (input: any) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const listItem = await db.listItem.create({ data: input })

    return listItem
  }
)
