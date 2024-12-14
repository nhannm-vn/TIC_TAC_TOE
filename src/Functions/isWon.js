import { winPattern } from '../Constants/winPattern'

//_Kiểm tra xem như thế nào là win
export const isWon = (board) => (icon) => {
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
