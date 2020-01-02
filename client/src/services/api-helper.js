import axios from 'axios';

const baseURL = 'http://localhost:3000'

const api = axios.create({
  baseURL
})


export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', loginData)
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  console.log(api.defaults.headers.common.authorization)
  return resp.data.user
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/users/', { user: registerData })
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const verifyUser = async () => {
  
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/auth/verify');
    return resp.data
  }
  return false
}

export const postPicture = async (data) => {
  debugger;
  const resp = await api.post(`http://localhost:3000/posts`, data)
  // console.log(resp)
  return resp.data
}


export const getPosts = async (id) => {
  
  const resp = await api.get(`http://localhost:3000/users/${id}/posts`)
  return resp.data
}

export const beforeActionToken = async () => {
  const token = localStorage.getItem('authToken');
  const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
  }
  return config
}

export const destroyPost = async (userId, id) => {

  // const token = localStorage.getItem('authToken');
  // const config = {
  //   headers: {
  //       'Authorization': `Bearer ${token}`
  //   }
  // }
  // const config = await beforeActionToken()
  const resp = await api.delete(`http://localhost:3000/users/${userId}/posts/${id}`)
  return resp.data
}