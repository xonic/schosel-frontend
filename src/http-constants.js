import axios from 'axios'

let baseURL

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:5000/api/v1'
} else {
  baseURL = 'https://www.schosel.net/worlds2018/api/v1'
}

// TODO: put this in else block
baseURL = 'https://identitytoolkit.googleapis.com/v1/accounts:'

const HTTP = axios.create(
  {
    baseURL: baseURL,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })

// HTTP.defaults.headers.post["Access-Control-Allow-Origin"] = "*"
// HTTP.defaults.headers.common["Content-Type"] = "application/json"

export default HTTP
