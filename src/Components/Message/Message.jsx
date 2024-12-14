import React from 'react'
import styles from './message.module.scss'

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

function returntTitle(status, player) {
  if (status === player.human) {
    return (
      <h2 className={styles.title}>
        Congratulations <span>X Win</span>
      </h2>
    )
  } else if (status === player.computer) {
    return (
      <h2 className={styles.title}>
        Congratulations <span>O Win</span>
      </h2>
    )
  } else {
    return <h2>Draw</h2>
  }
}

export default Message
