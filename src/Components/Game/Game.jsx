import React, { useState } from 'react'
import Board from '../Board/Board'

function Game() {
  const [board, setBoard] = useState(Array(9).fill(''))

  //_Đưa vị trí vào
  const handleClick = (pos) => {}

  return <Board value={board} onClick={handleClick} />
}

export default Game
