import { difference } from 'lodash'
import { winPattern } from '../Constants/winPattern'
import getRandomInt from './getRandomInt'

//_Function giúp xác định các nước cờ của computer
export default function determineComputerMove(board, player) {
  //_Tạo cái mảng kt pos computer
  const computerMoves = []
  //_Tạo cái mảng kt post human
  const humanMoves = []
  board.forEach((box, index) => {
    if (box === player.computer) {
      computerMoves.push(index)
    }
    if (box === player.human) {
      humanMoves.push(index)
    }
  })

  //_________If can win, then win

  for (const pattern of winPattern) {
    //_Đầu tiên kt trong danh sách đánh coi có vô thế nào mà còn 1 nước nữa win không
    const winPositions = difference(pattern, computerMoves)
    if (winPositions.length === 1) {
      //_Nếu như còn đúng một chỗ thì phải kiểm tra xe chỗ đó có ai đánh chưa
      //nếu chưa thì dứt liền
      const posWin = winPositions[0]
      if (!board[posWin]) {
        //_Nếu chỗ đó chưa ai đánh thì đưa ra để cho đánh liền
        return posWin
      }
    }
  }

  //_________If cannot win, then block

  for (const pattern of winPattern) {
    //_Đầu tiên kt trong danh sách đánh coi có vô thế nào mà còn 1 nước nữa
    //human win thì mình sẽ block vị trí đó
    const winPositions = difference(pattern, humanMoves)
    if (winPositions.length === 1) {
      //_Kiểm tra xem vị trí đó có ai đánh chưa
      const posWin = winPositions[0]
      if (!board[posWin]) {
        //_Nếu chỗ đó chưa ai đánh thì đưa ra để cho đánh liền
        return posWin
      }
    }
  }
  //_________If cannot block, take the middle

  //_Nếu không chặn được gì hoặc không có gì để đánh
  //thì ta nên đi giữa để cơ hội cao hơn
  const centerSquare = 4
  //_Nếu chưa ai đánh thì dứt
  if (!board[centerSquare]) {
    return centerSquare
  }

  //_________If cannot middle, then random

  //_Nếu không đánh giữa hoặc không biết đánh đâu thì quất random đi
  let randomPosition = getRandomInt(0, 9)
  //_Nếu đánh ở vị trí bất kỳ mà
  //vị trí đó k trống thì random vị trí khác
  while (board[randomPosition]) {
    randomPosition = getRandomInt(0, 9)
  }
  return randomPosition
}
