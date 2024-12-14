import React from 'react'
import styles from './box.module.scss'

function Box(props) {
  const { handleClick, index, value } = props

  const pressBtn = () => {
    handleClick(index)
  }

  return (
    <button className={styles.box} onClick={pressBtn}>
      {value}
    </button>
  )
}

export default Box
