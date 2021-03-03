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
    const errorData = code ? error.response.data : error.data
    const message = errorData?.message ?? ''
    // 只統一處理「純文字」的錯誤訊息
    // 客製的錯誤訊息，由各組件實現
    if (typeof message === 'string' && message && process.client) {
      alert(message)
    }
    return Promise.reject(errorData)
  })
}
