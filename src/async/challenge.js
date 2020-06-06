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

const execute = async () => {
  try {
    const { results: [ { id } ], info: { count } } = await fetchData('character')
    const { name, origin: { url }} = await fetchData(`character/${id}`)
    const { dimension } = await fetchData(url)
    console.log(count, name, dimension)
  } catch (error) {
    console.error(error)
  }
}

execute().then()
