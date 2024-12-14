import React from 'react'
import styles from './box.module.scss'

function Box(props) {
  return (
    <button className={styles.box} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

export default Box
