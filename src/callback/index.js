'use strict'

/* Example 1 */
function sum (num1, num2) {
  return num1 + num2
}

function calc (num1, num2, callback) {
  return callback(num1, num2)
}

const result = calc(2, 2, sum)
console.log(result)

/* Example 2 */
function date (callback) {
  console.log(new Date())
  setTimeout(function () {
    let date = new Date()
    callback(date)
  }, 3000)
}

function printDate (dateNow) {
  console.log(dateNow)
}

date(printDate)

date(function (dateNow) {
  console.log(dateNow)
})
