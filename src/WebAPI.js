import { getAuthToken } from './utils'

// const BASE_URL = 'https://api.artic.edu/api/v1'

const BASE_URL = 'https://openaccess-api.clevelandart.org/api'
const hasImage = 1
let limit = 40
let skip = 0

export const getCurrentViewCollections = () => {
  return fetch(
    `${BASE_URL}/artworks?&limit=${limit}&has_image=${hasImage}&skip=${skip}&currently_on_view`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }
  ).then((res) => res.json())
}

export const getSpecificCollections = (department) => {
  return fetch(
    `${BASE_URL}/artworks?limit=${limit}&has_image=${hasImage}&skip=${skip}&department=${department}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }
  ).then((res) => res.json())
}

export const searchCollections = (query) => {
  return fetch(
    `${BASE_URL}/artworks?q=${query}&limit=${limit}&has_image=${hasImage}&skip=${skip}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }
  ).then((res) => res.json())
}

export const searchArtists = (name) => {
  return fetch(`${BASE_URL}/creators?name=${name}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json())
}

export const getProducts = (page) => {
  return fetch(`${BASE_URL}/products?page=${page}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json())
}

// export const getArtworksImg = (imageID) => {
//   return fetch(
//     `https://lakeimagesweb.artic.edu/iiif/2/${imageID}/full/843,/0/default.jpg`
//   ).then((res) => )
// }

// let totalPosts = res.headers.get('x-total-count')
// console.log(artworks)
// return { totalPosts, artworks }

// export const getPost = (id) => {
//   return fetch(`${BASE_URL}/posts/${id}`).then((res) => res.json())
// }

// export const login = ({ username, password }) => {
//   return fetch(`${BASE_URL}/login`, {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       username,
//       password
//     })
//   }).then((res) => res.json())
// }

// export const getMe = () => {
//   const token = getAuthToken()
//   return fetch(`${BASE_URL}/me`, {
//     headers: {
//       authorization: `Bearer ${token}`
//     }
//   }).then((res) => res.json())
// }

// export const register = ({ nickname, username, password }) => {
//   return fetch(`${BASE_URL}/register`, {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       nickname,
//       username,
//       password
//     })
//   }).then((res) => res.json())
// }

// export const postNewPost = ({ title, body }) => {
//   const token = getAuthToken()
//   return fetch(`${BASE_URL}/posts`, {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//       authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify({
//       title,
//       body
//     })
//   }).then((res) => res.json())
// }

// export const deletePost = (id) => {
//   const token = getAuthToken()
//   return fetch(`${BASE_URL}/posts/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'content-type': 'application/json',
//       authorization: `Bearer ${token}`
//     }
//   }).then((res) => res.json())
// }

// export const editPost = ({ id, title, body }) => {
//   return fetch(`${BASE_URL}/posts/${id}`, {
//     method: 'PATCH',
//     headers: {
//       'content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       title,
//       body
//     })
//   }).then((res) => res.json())
// }
