import React, { useState } from 'react'
import Board from '../Board/Board'

function Game() {
  const [board, setBoard] = useState(Array(9).fill(''))

  const player = {
    human: 'X',
    computer: 'O'
  }

  //_Đưa vị trí vào
  const handleClick = (pos) => {
    //_TH: bấm vào ô đã có sẵn
    if (board[pos]) {
      return
    }

    //_Nếu đánh thì chắc chắn là human vì computer thì auto
    setBoard((prev) => {
      const boardCopy = [...prev]
      boardCopy[pos] = player.human
    })
  }

  return <Board value={board} onClick={handleClick} />
}

export default Game
