import axios from 'axios'
const api = axios.create({
  baseURL: 'http://192.168.33.4:3001'
})
export default api
