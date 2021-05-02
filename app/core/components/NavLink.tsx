import {
  Box,
  chakra,
  Flex,
  HTMLChakraProps,
  Icon,
  useColorModeValue as mode,
} from "@chakra-ui/react"
import * as React from "react"

interface DesktopNavLinkProps extends HTMLChakraProps<"a"> {
  active?: boolean
  isHomePage?: boolean
  to: string
}

const DesktopNavLink = (props: DesktopNavLinkProps) => {
  const { active, isHomePage, to, ...rest } = props
  return (
    <chakra.a
      href={to}
      aria-current={active ? "page" : undefined}
      fontWeight="semibold"
      color={isHomePage ? "whitesmoke" : mode("black.600", "gray.300")}
      {...rest}
      _activeLink={{
        color: mode("purple.600", "purple.300"),
        fontWeight: "bold",
        textDecoration: "underline purple",
      }}
      _hover={{ textDecoration: "underline" }}
    />
  )
}

interface MobileNavLinkProps {
  icon: React.ElementType
  children: React.ReactNode
  href?: string
}

const MobileNavLink = (props: MobileNavLinkProps) => {
  const { icon, children, href } = props
  return (
    <Flex
      as="a"
      href={href}
      m="-3"
      p="3"
      align="center"
      rounded="md"
      // cursor="pointer"
      _hover={{ bg: mode("gray.50", "gray.600") }}
    >
      <Icon as={icon} color={mode("purple.600", "purple.400")} fontSize="xl" />
      <Box marginStart="3" fontWeight="medium">
        {children}
      </Box>
    </Flex>
  )
}

export const NavLink = {
  Desktop: DesktopNavLink,
  Mobile: MobileNavLink,
}
