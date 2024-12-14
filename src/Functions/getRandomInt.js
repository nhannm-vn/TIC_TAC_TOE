//method random ra các vị trí của máy đánh
export default function getRandomInt(min, max) {
  //_Làm tròn lên
  min = Math.ceil(min)
  //_Làm tròn xuống
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}
