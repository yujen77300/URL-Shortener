

// 產生亂數的函數
function randomGenerator(length) {
  let randomstring = ''
  const alphabetuppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const alphabetlowercase = alphabetuppercase.toLowerCase()
  const number = "0123456789"
  const totalitem = number.concat(alphabetuppercase, alphabetlowercase)

  for (let i = 0; i < 5; i++) {
    randomstring += totalitem[Math.floor(Math.random() * 62)]
  }

  return randomstring

}




// 匯出randomgenerator這個函式，讓app.js可以使用
module.exports = randomGenerator