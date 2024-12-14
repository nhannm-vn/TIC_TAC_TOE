//_Đây sẽ là nơi chứa các box
import React from 'react'
import styles from './board.module.scss'
import Box from '../Box/Box'

function Board(props) {
  return (
    <div className={styles.board}>
      {[...Array(9)].map((_, index) => (
        <Box key={index.toString()} onClick={() => {}} value={props.value[index]} />
      ))}
    </div>
  )
}

export default Board
