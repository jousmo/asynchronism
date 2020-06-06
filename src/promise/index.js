'use strict'

const somethingsWillHappen = () => {
  return new Promise((resolve, reject) => {
    (true)
      ? setTimeout(() => resolve('Hey Promise One!'), 2000)
      : reject(new Error('Oops'))
  })
}

const otherSomethingsWillHappen = () => {
  return new Promise((resolve, reject) => {
    (true)
      ? setTimeout(() => resolve('Hey Promise Two!'), 2000)
      : reject(new Error('Oops'))
  })
}

somethingsWillHappen()
  .then(console.log)
  .catch(console.error)
  .finally(() => console.log('Finish'))

const allPromises = [somethingsWillHappen(), otherSomethingsWillHappen()]
Promise.all(allPromises)
  .then(console.log)
  .catch(console.error)
  .finally(() => console.log('Finish'))
