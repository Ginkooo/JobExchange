import { STORAGE } from './storage'

export async function makeRequest (config) {
    let token = null

    try {
        token = await STORAGE.load({
            key: 'authToken'
        })
    } catch (error) {
        console.log('no token')
    }

    let headers = {}

    if (token) {
      console.log('Token is: ' + token)
        headers = {
            Authorization: 'Token ' + token
        }
    }

    let method = config.method || 'GET'
    let body = config.body || {}

    headers.Accept = 'application/json'
    headers['Content-Type'] = 'application/json'

    let url = `http://192.168.1.9:8000${config.url}`
    console.log(url)

    let response = null

    if (method === 'GET' || method === 'HEAD') {
      response = await fetch(url, {
          method: method,
          headers: headers
      })
    } else {
      response = await fetch(url, {
          method: method,
          body: JSON.stringify(body),
          headers: headers
      })
    }

    let json = await response.json()

    console.log(JSON.stringify(json))

    if (response.status >=200 && response.status < 300) {
        if (config.onSuccess) {
            config.onSuccess(json)
        }
    } else {
        if (config.onError) {
            config.onError(json)
        }
    }
}
