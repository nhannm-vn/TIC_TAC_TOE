import React from 'react'
import styles from './button.module.scss'

function Button(props) {
  const { setboardList, setGameStop, setStatus } = props

  //_resetGame
  const resetGame = () => {
    setboardList(Array(9).fill(''))
    setGameStop(false)
    setStatus('')
  }

  return (
    <div className={styles.resetBlock}>
      <button onClick={resetGame} className={styles.reset}>
        Reset
      </button>
    </div>
  )
}

export default Button
