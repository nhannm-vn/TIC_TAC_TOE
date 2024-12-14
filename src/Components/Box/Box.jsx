import React from 'react'
import styles from './box.module.scss'

function Box() {
  return (
    <button className={styles.box} onClick={() => {}}>
      {'X'}
    </button>
  )
}

export default Box
