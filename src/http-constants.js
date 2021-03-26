import axios from 'axios'

let baseURL

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseURL = 'http://0.0.0.0:5000/api'
} else {
  baseURL = 'https://www.schosel.net/api/'
}

export const HTTP = axios.create(
  {
    baseURL: baseURL,
    withCredentials: true
  })
