import { STORAGE } from './storage'

export async function makeRequest (config) {
  let token = null

  try {
      token = await STORAGE.load({
          key: 'authToken'
      })
  } catch (error) {
      console.log('There is no authorization token in cache right now, wont include it in requests')
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

  let url = `http://192.168.100.3:8000${config.url}`

  let fetch_args = {
    headers: headers,
    method: method
  }

  if (!['get', 'head', 'options'].includes(method.toLowerCase()))
    fetch_args.body = JSON.stringify(body)

  let response = fetch(url, fetch_args)
    .then(resp => {
      resp.json()
        .then(json => {
          if (resp.status >= 200 && resp.status < 300) {
            config.onSuccess(json)
          } else {
            config.onError(json)
          }
        })
        .catch(err => {
          console.log('server returned no json response during request')
          config.onError()
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
      console.log(`ERROR ${JSON.stringify(err)}`)
    })
  console.log(`Just made request to ${url}`)
  if (config.body) {
    console.log(config.body)
  }

  console.log('')
}
