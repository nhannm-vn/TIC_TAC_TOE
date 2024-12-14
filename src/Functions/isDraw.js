//_Kiểm tra trường hợp hòa
export const isDraw = (board) => {
  //_lọc ra các thằng bỏ trống ta được cái mảng mà nếu cái mảng đó rỗng nghĩa là
  //ô nào cũng được điền và như vậy là draw
  return board.filter((box) => !box).length === 0
}
