//_Đây sẽ là nơi chứa các box
import React from 'react'
import Box from '../Box/Box'

function Board() {
  return (
    <div>
      {[...Array(9)].map((_, index) => (
        <Box />
      ))}
    </div>
  )
}

export default Board
