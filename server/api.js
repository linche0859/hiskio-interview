const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())
// const qs = require('querystring')

const env = {
  ...require('dotenv').config({ path: '.env.' + process.env.NODE_ENV }).parsed
}

app.get('/me', async (request, response) => {
  const { accessToken, tokenType } = request.query
  const type = tokenType[0].toUpperCase() + tokenType.slice(1)
  try {
    const { data } = await axios({
      baseURL: env.API_URL,
      url: '/me',
      method: 'get',
      headers: { authorization: `${type} ${accessToken}` }
    })
    response.json({ ...data })
  } catch {
    response.json({ username: '', avatar: '' })
  }
})

app.post('/logout', async (request, response) => {
  const { accessToken, tokenType, data } = request.body
  const type = tokenType[0].toUpperCase() + tokenType.slice(1)
  try {
    const { data: responseData } = await axios({
      baseURL: env.API_URL,
      url: '/auth/logout',
      method: 'post',
      headers: { authorization: `${type} ${accessToken}` },
      data
    })
    response.json({ ...responseData })
  } catch {
    response.json({})
  }
})

app.post('/carts', async (request, response) => {
  const { accessToken, tokenType, data } = request.body
  const config = {
    baseURL: env.API_URL,
    url: '/carts',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  }
  if (accessToken && tokenType) {
    const type = tokenType[0].toUpperCase() + tokenType.slice(1)
    config.headers.authorization = `${type} ${accessToken}`
  }
  try {
    const { data: responseData } = await axios(config)
    response.json({ ...responseData })
  } catch {
    response.json({
      data: [],
      global_coupon: {},
      subtotal: 0,
      total: 0
    })
  }
})

app.delete('/carts', async (request, response) => {
  const { accessToken, tokenType, data } = request.body
  const type = tokenType[0].toUpperCase() + tokenType.slice(1)
  try {
    const { data: responseData } = await axios({
      baseURL: env.API_URL,
      url: '/carts',
      method: 'delete',
      headers: { authorization: `${type} ${accessToken}` },
      data
    })
    response.json({ ...responseData })
  } catch {
    response.json({})
  }
})

module.exports = app
