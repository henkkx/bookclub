import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetListItemsInput
  extends Pick<Prisma.ListItemFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetListItemsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: listItems, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.listItem.count({ where }),
      query: (paginateArgs) => db.listItem.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      listItems,
      nextPage,
      hasMore,
      count,
    }
  }
)
