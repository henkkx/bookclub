import * as React from "react"

import { Box, Container, HStack, VStack } from "@chakra-ui/layout"
import { fetchBooksByQuery } from "../utils/apiClient"
import { Button } from "@chakra-ui/button"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input"
import { FaSearch } from "react-icons/fa"

interface Props {}

export default function SearchBox(props: Props) {
  const [query, setQuery] = React.useState<string>("")
  const [queried, setQueried] = React.useState<boolean>(false)
  const [page, setPage] = React.useState(0)
  const [books, setBooks] = React.useState<any[]>([])

  function handleSearch(event: React.FormEvent<any>) {
    event.preventDefault()
    const q = event.currentTarget.elements.searchQuery.value
    console.log("q :>> ", q)
    setQuery(q)
    setQueried(true)
  }

  React.useEffect(() => {
    if (!queried) {
      return
    }
    fetchBooksByQuery(query, page).then((res) => {
      setBooks(res.items)
      console.log(res.items)
    })
  }, [query, queried])

  return (
    <Container>
      <HStack>
        <form onSubmit={handleSearch}>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaSearch color="gray.300" />} />
            <Input
              variant="filled"
              type="text"
              id="book search"
              name="searchQuery"
              placeholder="Search for books"
            />
            <Button bg="rgb(234, 128, 194)" type="submit">
              search
            </Button>
          </InputGroup>
        </form>
      </HStack>

      <VStack>
        {queried ? books.map((book) => <Box key={book.id}> {book.volumeInfo.title} </Box>) : null}
      </VStack>
    </Container>
  )
}
