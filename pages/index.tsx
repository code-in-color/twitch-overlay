import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import TmiClient from '../common/tmi'
import styles from '../styles/Chat.module.css'

interface Message {
  readonly id?: string
  readonly user?: string
  readonly message: string
}

const Home: NextPage = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [client, setClient] = useState<string | null>(null)

  useEffect(() => {
    const initTmi = async () => {
      try {
        if (!client) {
          const [connection] = await TmiClient.connect()
          setClient(connection)
        }

        TmiClient.on('message', (channel, tags, message, self) => {
          if (self) return

          setMessages([
            { message, id: tags.id, user: tags['display-name'] },
            ...messages,
          ])
        })
      } catch (err) {
        console.error(err)
      }
    }

    initTmi()
  }, [messages, client])

  return (
    <div className={styles.container}>
      <Head>
        <title>Code in Color</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ul>
        {messages.map((m) => (
          <li className={styles.message} key={m.id}>
            <span>{`${m.user}:`}</span>
            {` ${m.message}`}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
