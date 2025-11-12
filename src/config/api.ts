import axios from 'axios'

interface ShortUrlPayload {
  originalUrl: string
  expirationDate: string
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  generateShortUrl({ originalUrl, expirationDate }: ShortUrlPayload) {
    return api.post('/shorten-url', { originalUrl, expirationDate })
  }
}
