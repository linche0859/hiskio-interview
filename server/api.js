const express = require('express')
const app = express()
const axios = require('axios')
// const qs = require('querystring')

const env = {
  ...require('dotenv').config({ path: '.env.' + process.env.NODE_ENV }).parsed
}

app.get('/me', async (request, response) => {
  const token = request.query.accessToken
  try {
    const { data } = await axios({
      baseURL: env.API_URL,
      url: '/me',
      method: 'get',
      headers: { authorization: `Bearer ${token}` }
    })
    response.json({ ...data })
  } catch {
    response.json({ message: '發生錯誤' })
  }
})

module.exports = app
