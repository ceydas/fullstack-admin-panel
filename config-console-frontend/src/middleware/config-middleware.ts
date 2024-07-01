import axios from 'axios'
import 'dotenv'

const _BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default async function authenticatedRequest(
  token: string,
  endpoint: string,
  method: string,
  data = {}
) {
  try {
    const request_body = {
      url: `${_BACKEND_URL}${endpoint}`,
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: data
    }
    console.log(request_body)
    const response = await axios(request_body)
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Error making authenticated request:', error)
    throw Error('Error making authenticated request:')
  }
}
