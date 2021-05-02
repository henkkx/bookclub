import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getListItem from "app/list-items/queries/getListItem"
import deleteListItem from "app/list-items/mutations/deleteListItem"

export const ListItem = () => {
  const router = useRouter()
  const listItemId = useParam("listItemId", "number")
  const [deleteListItemMutation] = useMutation(deleteListItem)
  const [listItem] = useQuery(getListItem, { id: listItemId })

  return (
    <>
      <Head>
        <title>ListItem {listItem.id}</title>
      </Head>

      <div>
        <h1>ListItem {listItem.id}</h1>
        <pre>{JSON.stringify(listItem, null, 2)}</pre>

        <Link href={`/listItems/${listItem.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteListItemMutation({ id: listItem.id })
              router.push("/listItems")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowListItemPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/listItems">
          <a>ListItems</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ListItem />
      </Suspense>
    </div>
  )
}

ShowListItemPage.authenticate = true
ShowListItemPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowListItemPage
