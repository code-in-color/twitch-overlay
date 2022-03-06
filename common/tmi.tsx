import { client as tmiClient } from "tmi.js"
import {
  _TwitchChannels_,
  _TwitchPassword_,
  _TwitchUsername_,
} from "./constant"

const client = tmiClient({
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: _TwitchUsername_,
    password: _TwitchPassword_,
  },
  channels: _TwitchChannels_,
})

export default client
