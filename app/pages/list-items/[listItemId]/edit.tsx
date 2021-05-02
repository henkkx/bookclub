import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getListItem from "app/list-items/queries/getListItem"
import updateListItem from "app/list-items/mutations/updateListItem"
import { ListItemForm, FORM_ERROR } from "app/list-items/components/ListItemForm"

export const EditListItem = () => {
  const router = useRouter()
  const listItemId = useParam("listItemId", "number")
  const [listItem, { setQueryData }] = useQuery(getListItem, { id: listItemId })
  const [updateListItemMutation] = useMutation(updateListItem)

  return (
    <>
      <Head>
        <title>Edit ListItem {listItem.id}</title>
      </Head>

      <div>
        <h1>Edit ListItem {listItem.id}</h1>
        <pre>{JSON.stringify(listItem)}</pre>

        <ListItemForm
          submitText="Update ListItem"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateListItem}
          initialValues={listItem}
          onSubmit={async (values) => {
            try {
              const updated = await updateListItemMutation({
                id: listItem.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(`/listItems/${updated.id}`)
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditListItemPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditListItem />
      </Suspense>

      <p>
        <Link href="/listItems">
          <a>ListItems</a>
        </Link>
      </p>
    </div>
  )
}

EditListItemPage.authenticate = true
EditListItemPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditListItemPage
