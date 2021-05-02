import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createListItem from "app/list-items/mutations/createListItem"
import { ListItemForm, FORM_ERROR } from "app/list-items/components/ListItemForm"

const NewListItemPage: BlitzPage = () => {
  const router = useRouter()
  const [createListItemMutation] = useMutation(createListItem)

  return (
    <div>
      <h1>Create New ListItem</h1>

      <ListItemForm
        submitText="Create ListItem"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateListItem}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const listItem = await createListItemMutation(values)
            router.push(`/listItems/${listItem.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href="/listItems">
          <a>ListItems</a>
        </Link>
      </p>
    </div>
  )
}

NewListItemPage.authenticate = true
NewListItemPage.getLayout = (page) => <Layout title={"Create New ListItem"}>{page}</Layout>

export default NewListItemPage
