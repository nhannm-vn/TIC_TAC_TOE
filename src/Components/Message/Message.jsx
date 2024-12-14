import React from 'react'
import styles from './message.module.scss'
import { returntTitle } from './support.message'

function Message(props) {
  const { status, player } = props

  const mainTitle = (
    <h2 className={styles.title}>
      Tic Tac Toe In <span>React</span>
    </h2>
  )

  const subTitle = returntTitle(status, player)

  return <div>{status ? subTitle : mainTitle}</div>
}

export default Message
