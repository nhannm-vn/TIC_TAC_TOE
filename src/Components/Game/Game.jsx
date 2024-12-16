import React, { useState } from 'react'
import Board from '../Board/Board'
import Message from '../Message/Message'
import Button from '../Button/Button'
import determineComputerMove from '../../Functions/determineComputerMove'
import { isWon } from '../../Functions/isWon'
import { isDraw } from '../../Functions/isDraw'
import { player } from '../../Constants/player'

function Game() {
  //_Danh sách để lưu lại khi đánh và render giá trị ra cho box
  const [boardList, setboardList] = useState(Array(9).fill(''))
  //
  //
  //_State để dừng game khi thắng thua hòa
  //_Ban đầu thì cho false nghĩa là vẫn chơi được bình thường
  const [isGameStopped, setGameStop] = useState(false)

  //_Sate dùng để thông báo thắng thua
  const [status, setStatus] = useState('')

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
      setStatus(player.human)
      //_set biến lại để dừng game
      setGameStop(true)
      return
    }

    if (isDraw(boardListCopy)) {
      setStatus('DRAW')
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
        setStatus(player.computer)
        //_set biến lại để dừng game
        setGameStop(true)
        return
      }

      if (isDraw(boardListCopy2)) {
        setStatus('DRAW')
        //_set biến lại để dừng luôn game
        setGameStop(true)
        return
      }
    }, 500)
  }

  return (
    <div>
      <Message status={status} player={player} />
      <Board boardList={boardList} handleClick={handleClick} />
      <Button setboardList={setboardList} setGameStop={setGameStop} setStatus={setStatus} />
    </div>
  )
}

export default Game

/**
 * difference là một hàm trong lodash giúp kiểm tra xem thử là
 * giá trị nguyên thủy trong hai mảng có gì khác nhau hay khồng
 */
