import React from 'react'
import styles from './button.module.scss'

function Button() {
  return (
    <div className={styles.resetBlock}>
      <button className={styles.reset}>Reset</button>
    </div>
  )
}

export default Button
