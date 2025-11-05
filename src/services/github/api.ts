import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_GITHUB_API_URL,
})

// Note: The API works without a token,
// but has a limit on the number of requests.
// Adding the token to all requests
// Verify that the token exists before adding it
if (import.meta.env.VITE_GITHUB_TOKEN) {
  api.defaults.headers.common['Authorization'] =
    `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
}

export { api }
