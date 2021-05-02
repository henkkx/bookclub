import { Suspense } from "react"
import { Link, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import SearchBox from "app/core/components/SearchBox"
import { Center, Heading, HStack } from "@chakra-ui/layout"
import { Box, Button, Img, Input, Stack, Text, useColorModeValue as mode } from "@chakra-ui/react"
import { HiShieldCheck } from "react-icons/hi"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        {/* <Link href="/signup">
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href="/login">
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link> */}
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <main
      className="container"
      style={{
        backgroundImage: "url(/waves.svg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <Box as="section" width="100%" px="3" py="12">
        <Box
          maxW={{ base: "xl", md: "5xl" }}
          maxH={{ md: "xl" }}
          mx="auto"
          px={{ base: "6", md: "8" }}
          textAlign="center"
          bg={mode("white", "gray.800")}
          shadow="lg"
          py="12"
          rounded="lg"
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            spacing={{ base: "3rem", lg: "2rem" }}
            mt="8"
            align={{ lg: "center" }}
            justify="space-between"
          >
            <Box flex="1" maxW={{ lg: "600px" }}>
              <Heading
                as="h1"
                size="3xl"
                color="gray.800"
                fontWeight="extrabold"
                letterSpacing="tight"
              >
                Get started with bookclub today
              </Heading>
              <Text color="gray.900" mt="4" fontSize="lg" fontWeight="medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </Text>
              <Stack direction={{ base: "column", md: "row" }} spacing="4" mt="8">
                <Button
                  size="lg"
                  minW="210px"
                  bg="rgb(113, 93, 242)"
                  color="white"
                  height="14"
                  px="8"
                >
                  Register
                </Button>
                <Button
                  size="lg"
                  bg="white"
                  color="gray.900"
                  _hover={{ bg: "gray.50" }}
                  height="14"
                  px="8"
                  shadow="base"
                >
                  Read more
                </Button>
              </Stack>
              <Text mt="8" color={mode("gray.600", "gray.400")}>
                Already have an account store?{" "}
                <Link href="#" textDecoration="underline">
                  Log in
                </Link>
              </Text>
            </Box>
            <Box pos="relative" w={{ base: "full", lg: "400px" }} h={{ base: "auto", lg: "370px" }}>
              <Img
                w="full"
                pos="relative"
                zIndex="1"
                h={{ lg: "100%" }}
                objectFit="cover"
                src="booklover.svg"
                alt="Reading a book"
              />
              <Box pos="absolute" w="100%" h="100%" top="0" left="-4" />
            </Box>
          </Stack>
        </Box>
      </Box>

      <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;700&display=swap");

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Libre Franklin", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }
        .container {
          // min-height: 100vh;
          display: flex;
          flex-direction: column;
          // justify-content: center;
          // align-items: center;
        }

        main {
          // padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          // justify-content: center;
          // align-items: center;
        }

        main p {
          font-size: 1.2rem;
        }

        p {
          text-align: center;
        }

        footer {
          // width: 100%;
          // height: 60px;
          // border-top: 1px solid #eaeaea;
          // display: flex;
          // justify-content: center;
          // align-items: center;
          // background-color: #bdb2ff;
        }

        .buttons {
          display: grid;
          grid-auto-flow: column;
          grid-gap: 0.5rem;
        }
        .button {
          font-size: 1rem;
          background-color: #6700eb;
          padding: 1rem 2rem;
          color: #f4f4f4;
          text-align: center;
        }

        .button.small {
          padding: 0.5rem 1rem;
        }

        // .button:hover {
        //   background-color: #45009d;
        // }

        .button-outline {
          border: 2px solid #6700eb;
          padding: 1rem 2rem;
          color: #6700eb;
          text-align: center;
        }

        // .button-outline:hover {
        //   border-color: #45009d;
        //   color: #45009d;
        // }

        pre {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          text-align: center;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
