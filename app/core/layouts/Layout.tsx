import { ReactNode } from "react"
import { Head } from "blitz"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "bookclub"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {children}

      <Footer />
    </>
  )
}

export default Layout
