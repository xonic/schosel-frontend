import axios from 'axios'

let baseURL

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:5000/api/v1'
} else {
  baseURL = 'https://www.schosel.net/worlds2018/api/v1'
}

export const HTTP = axios.create(
  {
    baseURL: baseURL
  })
