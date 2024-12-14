import React, { useState } from 'react'
import Board from '../Board/Board'
import { difference } from 'lodash'

//_Function giúp xác định các nước cờ của computer
function determineComputerMove(board, player) {
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

  //_________If cannot middle, then random
  let randomPosition = getRandomInt(0, 9)
  //_Nếu đánh ở vị trí bất kỳ mà
  //vị trí đó k trống thì random vị trí khác
  while (board[randomPosition]) {
    randomPosition = getRandomInt(0, 9)
  }
  return randomPosition
}

function getRandomInt(min, max) {
  //_Làm tròn lên
  min = Math.ceil(min)
  //_Làm tròn xuống
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

//_Các trường hợp sẽ win
//mảng chứa các mảng con chứa các vị trí khi đi vào đó thì sẽ win
const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
//_Kiểm tra xem như thế nào là win
const isWon = (board) => (icon) => {
  for (let i = 0; i < winPattern.length; i++) {
    let [a, b, c] = winPattern[i]
    //_Dò thử xem nếu board mà có giá trị ở các vị trí đó thì nghĩa là win
    if (board[a] === icon && board[b] === board[c] && board[c] === board[a]) {
      return true
    }
  }
  //_Nếu k có thì là false
  return false
}

//_Kiểm tra trường hợp hòa
const isDraw = (board) => {
  //_lọc ra các thằng bỏ trống ta được cái mảng mà nếu cái mảng đó rỗng nghĩa là
  //ô nào cũng được điền và như vậy là draw
  return board.filter((box) => !box).length === 0
}

function Game() {
  //_Danh sách để lưu lại khi đánh và render giá trị ra cho box
  const [boardList, setboardList] = useState(Array(9).fill(''))
  //_State để dừng game khi thắng thua hòa
  //_Ban đầu thì cho false nghĩa là vẫn chơi được bình thường
  const [isGameStopped, setGameStop] = useState(false)

  //_Sate dùng để thông báo thắng thua
  const [message, setMessage] = useState('Tic tac toe')

  const player = {
    human: 'X',
    computer: 'O'
  }

  //_Đưa vị trí vào và sau đó set lại value cho vị trí đó trong mảng
  const handleClick = (pos) => {
    //_Nếu game đã dừng thì không cho bấm luôn. Nghĩa là khóa không cho bấm nữa
    if (isGameStopped) {
      return
    }

    //_TH: bấm vào ô đã có sẵn thì k cho click
    if (boardList[pos]) {
      return
    }

    //_Nếu đánh thì chắc chắn là human vì computer thì auto
    const boardListCopy = [...boardList]
    boardListCopy[pos] = player.human
    setboardList(boardListCopy)

    //_LƯU Ý: MẤY THẰNG SET NÀY KHÔNG HẲN LÀ BẤT ĐỒNG BỘ
    //TUY NHIÊN NẾU MÀ MỚI SET MÀ XÀI LIỀN BÊN DƯỚI THÌ CÓ KHI BỊ LỖI
    //NGHĨA LÀ MỚI DESTRUCTURING LẠI STATE THÌ CÓ KHI NÓ CẬP NHẬT KHÔNG KỊP

    //_check draw and win condition

    //nếu thắng thì ta không có bấm nữa
    //đồng thời dừng game lại(tạo thêm state)
    if (isWon(boardListCopy)(player.human)) {
      setMessage(`Won ${player.human}`)
      //_set biến lại để dừng game
      setGameStop(true)
      return
    }

    if (isDraw(boardListCopy)) {
      setMessage('DRAW')
      //_set biến lại để dừng luôn game
      setGameStop(true)
      return
    }

    //computermove

    //_Mình muốn đánh xong đợi tí rồi máy mới đánh
    setTimeout(() => {
      const computerIndex = determineComputerMove(boardListCopy, player)
      //_Mình sẽ copy lại cái bảng vì mình không muốn reference tới đó
      //mặc khác sẽ dễ sử dụng
      const boardListCopy2 = [...boardListCopy]
      boardListCopy2[computerIndex] = player.computer
      setboardList(boardListCopy2)

      //_Check để thông báo và dừng game cho condition của human
      if (isWon(boardListCopy2)(player.computer)) {
        setMessage(`Won ${player.computer}`)
        //_set biến lại để dừng game
        setGameStop(true)
        return
      }

      if (isDraw(boardListCopy2)) {
        setMessage('DRAW')
        //_set biến lại để dừng luôn game
        setGameStop(true)
        return
      }
    }, 500)
  }

  return (
    <div>
      <h3>{message}</h3>
      <Board boardList={boardList} handleClick={handleClick} />
    </div>
  )
}

export default Game

/**
 * difference là một hàm trong lodash giúp kiểm tra xem thử là
 * giá trị nguyên thủy trong hai mảng có gì khác nhau hay khồng
 */
