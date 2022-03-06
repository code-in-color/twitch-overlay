import type { NextPage } from "next"
import Head from "next/head"
import { useEffect } from "react"
import useTmiClient from "../common/tmi"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  const [tmi] = useTmiClient()

  useEffect(() => {
    const initTmi = async () => {
      try {
        const [s, n] = await tmi.connect()

        tmi.on("message", (channel, tags, message, self) => {
          if (self) return
          if (message.toLowerCase() === "!hello") {
            tmi.say(channel, `@${tags.username}, heya!`)
          }
        })
      } catch (err) {
        console.error(err)
      }
    }

    initTmi()
  }, [tmi])

  return (
    <div className={styles.container}>
      <Head>
        <title>Code in Color</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

export default Home
