'use strict'

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const API = 'https://rickandmortyapi.com/api'

function fetchData (resource, callback) {
  const xhr = new XMLHttpRequest()
  const urlApi = resource.includes('https') ? `${resource}/` : `${API}/${resource}/`

  xhr.open('GET', urlApi, true)
  xhr.onreadystatechange = function (event) {
    if (this.readyState === 4) {
      if (this.status === 200) {
        const json = JSON.parse(this.responseText)
        callback(null, json)
      } else {
        const error = new Error(`API not found: ${urlApi}`)
        callback(error)
      }
    }
  }
  xhr.send()
}

fetchData('character', function (error, data) {
  if (error) return console.error(error)

  const { results: [ { id } ], info: { count } } = data
  fetchData(`character/${id}`, function (error, data) {
    if (error) return console.error(error)

    const { name, origin: { url }} = data
    fetchData(url, function (error, data) {
      if (error) return console.error(error)

      const { dimension } = data
      console.log(count, name, dimension)
    })
  })
})
