import { useColorModeValue } from "@chakra-ui/color-mode"
import { Heading, HStack } from "@chakra-ui/layout"
import { chakra, HTMLChakraProps, useToken } from "@chakra-ui/system"

interface ILogoProps {
  size?: "sm" | "md" | "lg"
  isHomePage?: boolean
  h?: string
}
export const Logo = ({ size, isHomePage, ...rest }: ILogoProps) => {
  const [white, black] = useToken("colors", ["white", "gray.800"])
  return (
    <HStack {...rest} padding={0}>
      <Heading color={isHomePage ? "whitesmoke" : black} size={size}>
        Bookclub
      </Heading>
    </HStack>
  )
}
