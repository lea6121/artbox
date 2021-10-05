const BASE_URL = 'https://openaccess-api.clevelandart.org/api'
const hasImage = 1
let limit = 24

export const getCollections = (skip) => {
  return fetch(
    `${BASE_URL}/artworks?&limit=${limit}&has_image=${hasImage}&skip=${skip}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }
  ).then((res) => res.json())
}

export const getSpecificCollections = (department, skip) => {
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

export const searchCollections = (query, skip) => {
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

export const getArtwork = (id) => {
  return fetch(`${BASE_URL}/artworks/${id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json())
}
