import React, { useState } from 'react'
import Board from '../Board/Board'

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
const isWon = (board) => {
  for (let i = 0; i < winPattern.length; i++) {
    let [a, b, c] = winPattern[i]
    //_Dò thử xem nếu board mà có giá trị ở các vị trí đó thì nghĩa là win
    if (board[a] === 'X' && board[b] === 'X' && board[c] === 'X') {
      return true
    }
  }
  //_Nếu k có thì là false
  return false
}

//_Kiểm tra trường hợp hòa
const isDraw = (board) => {
  //_Nếu mà bàn cờ còn ô mà chưa phân thắng bại thì cứ đánh
  //còn nếu bít rồi mà chưa thắng bại thì là draw
  //nghĩa là bàn cờ phải full hết và không có ô nào đc bỏ trống

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
    if (isWon(boardListCopy)) {
      //_set biến lại để dừng game
      setGameStop(true)
      return
    }
  }

  return <Board boardList={boardList} handleClick={handleClick} />
}

export default Game
