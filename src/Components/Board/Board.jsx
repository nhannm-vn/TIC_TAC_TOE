//_Đây sẽ là nơi chứa các box
import React from 'react'
import styles from './board.module.scss'
import Box from '../Box/Box'

function Board(props) {
  return (
    <div className={styles.board}>
      {[...Array(9)].map((_, index) => (
        //_Tới đây khi mình truyền vì là render 9 lần nên mình sẽ cho mỗi mỗi ô có
        //value ứng với từng index khác nhau để render ra bên box
        <Box key={index.toString()} onClick={() => {}} value={props.value[index]} />
      ))}
    </div>
  )
}

export default Board
