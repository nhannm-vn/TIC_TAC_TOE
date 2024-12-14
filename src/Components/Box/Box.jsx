import React from 'react'
import styles from './box.module.scss'

function Box(props) {
  const { onClick, index, value } = props

  const pressBtn = () => {
    onClick(index)
  }

  return (
    <button className={styles.box} onClick={pressBtn}>
      {value}
    </button>
  )
}

export default Box
