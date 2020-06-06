'use strict'

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const API = 'https://rickandmortyapi.com/api'

const fetchData = resource => {
  const xhr = new XMLHttpRequest()
  const urlApi = resource.includes('https') ? `${resource}/` : `${API}/${resource}/`

  return new Promise((resolve, reject) => {
    xhr.open('GET', urlApi, true)
    xhr.onreadystatechange = function (event) {
      if (this.readyState === 4) {
        if (this.status === 200) {
          const json = JSON.parse(this.responseText)
          resolve(json)
        } else {
          const error = new Error(`API not found: ${urlApi}`)
          reject(error)
        }
      }
    }
    xhr.send()
  })
}

fetchData('character')
  .then(data => {
    const { results: [ { id } ], info: { count } } = data
    console.log(count)
    return fetchData(`character/${id}`, count)
  })
  .then(data => {
    const { name, origin: { url }} = data
    console.log(name)
    return fetchData(url)
  })
  .then(data => {
    const { dimension } = data
    console.log(dimension)
  })
  .catch(console.error)
  .finally(() => console.log('Finish Promise'))
