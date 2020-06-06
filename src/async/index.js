'use strict'

const doSomethingAsync = () => {
  return new Promise((resolve, reject) => {
    (true)
      ? setTimeout(() => resolve('Do Something Async'), 2000)
      : reject(new Error('Oops'))
  })
}

const doSomething = async () => {
  try {
    const something = await doSomethingAsync()
    console.log(something)
  } catch (error) {
    console.error(error)
  }
}

console.log('Before')
doSomething().then()
console.log('After')
