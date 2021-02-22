export default function ({ $axios, store, redirect, error }) {
  // $axios.setBaseURL(process.env.API_URL)
  $axios.setHeader('Content-Type', 'application/json')

  $axios.onRequest((config) => {
    return config
  })

  $axios.onResponse((response) => {
    return response.status === 200 ? Promise.resolve(response) : Promise.reject(response)
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error.data)
  })
}
