import styles from './message.module.scss'

export function returntTitle(status, player) {
  if (status === player.human) {
    return (
      <h2 className={styles.title}>
        Congratulations <span>✖️ Win</span>
      </h2>
    )
  } else if (status === player.computer) {
    return (
      <h2 className={styles.title}>
        Congratulations <span>⭕ Win</span>
      </h2>
    )
  } else {
    return <h2 className={styles.title}>Draw</h2>
  }
}
