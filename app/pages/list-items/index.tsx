import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getListItems from "app/list-items/queries/getListItems"

const ITEMS_PER_PAGE = 100

export const ListItemsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ listItems, hasMore }] = usePaginatedQuery(getListItems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {listItems.map((listItem) => (
          <li key={listItem.id}>
            <Link href={`/listItems/${listItem.id}`}>
              <a>{listItem}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ListItemsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>ListItems</title>
      </Head>

      <div>
        <p>
          <Link href="/listItems/new">
            <a>Create ListItem</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ListItemsList />
        </Suspense>
      </div>
    </>
  )
}

ListItemsPage.authenticate = true
ListItemsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ListItemsPage
