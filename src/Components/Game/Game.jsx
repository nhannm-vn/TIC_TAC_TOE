import React, { useState } from 'react'
import Board from '../Board/Board'

function Game() {
  const [boardList, setboardList] = useState(Array(9).fill(''))

  const player = {
    human: 'X',
    computer: 'O'
  }

  //_Đưa vị trí vào và sau đó set lại value cho vị trí đó trong mảng
  const handleClick = (pos) => {
    //_TH: bấm vào ô đã có sẵn
    if (boardList[pos]) {
      return
    }

    //_Nếu đánh thì chắc chắn là human vì computer thì auto
    setboardList((prev) => {
      const boardListCopy = [...prev]
      boardListCopy[pos] = player.human
      return boardListCopy
    })
  }

  return <Board boardList={boardList} handleClick={handleClick} />
}

export default Game
