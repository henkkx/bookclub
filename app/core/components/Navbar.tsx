import { useRouter } from "@blitzjs/core"
import {
  Box,
  Button,
  Flex,
  HStack,
  useColorModeValue as mode,
  VisuallyHidden,
} from "@chakra-ui/react"
import * as React from "react"
import { Logo } from "./Logo"
import { MobileNav } from "./MobileNav"
import { NavLink } from "./NavLink"

export default function Navbar() {
  const { pathname } = useRouter()
  const isHomePage = pathname === "/"
  return (
    <Box>
      <Box
        as="header"
        bg={isHomePage ? "#715DF2" : mode("white", "gray.800")}
        // borderBottomWidth="1px"
      >
        <Box maxW="7xl" mx="auto" py="4" px={{ base: "6", md: "8" }}>
          <Flex as="nav" justify="space-between">
            <HStack spacing="8">
              <Box as="a" href="#" rel="home">
                <VisuallyHidden>Envelope app</VisuallyHidden>
                <Logo isHomePage={isHomePage} h="6" />
              </Box>
              <HStack display={{ base: "none", lg: "flex" }} spacing="8">
                <NavLink.Desktop
                  to="/discover"
                  isHomePage={isHomePage}
                  active={pathname == "/discover"}
                >
                  Discover{" "}
                </NavLink.Desktop>
                <NavLink.Desktop to="/list" isHomePage={isHomePage} active={pathname == "/list"}>
                  My books
                </NavLink.Desktop>
              </HStack>
            </HStack>
            <Flex align="center">
              <HStack spacing="8" display={{ base: "none", md: "flex" }}>
                <NavLink.Desktop to="/login" isHomePage>
                  Log in{" "}
                </NavLink.Desktop>
                <Button
                  background="rgb(234, 128, 194)"
                  color="whitesmoke"
                  //   border="2px solid #4A5568"
                  _hover={{ background: "rgb(196, 102, 215)" }}
                  rounded="full"
                >
                  Register
                </Button>
              </HStack>
              <Box ml="5">
                <MobileNav />
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
