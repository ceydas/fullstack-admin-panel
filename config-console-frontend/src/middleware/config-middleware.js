import axios from 'axios'
import 'dotenv'

let _BACKEND_URL = import.meta.env.VITE_BACKEND_URL

//TODO add endpoint
export default async function authenticatedRequest(token, endpoint, method, data = {}) {
  try {
    let response_body = {
      url: `${_BACKEND_URL}${endpoint}`,
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: data
    }
    console.log(response_body)
    const response = await axios(response_body)
    return response.data
  } catch (error) {
    console.error('Error making authenticated request:', error)
    throw error
  }
}


// set admin privileges to uid
export const setAdminPrivileges = async (uid) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true })
    console.log('Admin privileges granted to user:', uid)
  } catch (error) {
    console.error('Error setting admin privileges:', error)
  }
}