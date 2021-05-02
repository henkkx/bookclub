import * as React from "react"
import {
  Box,
  Stack,
  chakra,
  HTMLChakraProps,
  ButtonGroup,
  IconButton,
  Text,
  Heading,
  HStack,
} from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa"
import { Logo } from "./Logo"
import { useRouter } from "@blitzjs/core"

function Footer() {
  const { pathname } = useRouter()
  const isHomePage = pathname === "/"
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      //    maxW="7xl"
      py="12"
      backgroundColor={isHomePage ? "#F7CACA" : "whitesmoke"}
      px={{ base: "4", md: "8" }}
    >
      <Stack>
        <Stack direction="row" spacing="4" align="center" justify="space-between">
          <Logo isHomePage={isHomePage} size="sm" />
          <ButtonGroup variant="ghost" color="gray.600">
            <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub fontSize="20px" />} />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" alignSelf={{ base: "center", sm: "start" }}>
          &copy; {new Date().getFullYear()} Bookclub. All rights reserved.
        </Text>
      </Stack>
    </Box>
  )
}

export default Footer
