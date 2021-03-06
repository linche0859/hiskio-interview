import Cookie from 'js-cookie'
// import jwtDecode from 'jwt-decode'

export const state = () => ({
  // 使用者是否登入
  isUserLoggedIn: false,
  // 登入的到期時間
  expiresIn: 0,
  // // 訪問金鑰
  accessToken: '',
  // // 金鑰類型
  tokenType: '',
  // 使用者名稱
  username: '',
  // 使用者大頭照
  avatar: ''
})

export const getters = {
  token: (state) => {
    return { expiresIn: state.expiresIn, accessToken: state.accessToken, tokenType: state.tokenType }
  },
  userInfo: (state) => {
    return {
      isUserLoggedIn: state.isUserLoggedIn,
      username: state.username,
      avatar: state.avatar
    }
  }
}

export const mutations = {
  SET_USER_LOGGEDIN: (state, payload) => {
    const { access_token: accessToken = '', token_type: tokenType = '', expires_in: expiresIn = 0 } = payload
    state.isUserLoggedIn = true
    state.accessToken = accessToken
    state.tokenType = tokenType
    state.expiresIn = expiresIn

    if (process.client) {
      Cookie.set('access_token', accessToken)
      Cookie.set('token_type', tokenType)
      Cookie.set('expires_in', expiresIn)
    }
  },
  SET_USER_INFO: (state, payload) => {
    const { username, avatar } = payload
    state.username = username
    state.avatar = avatar

    if (process.client) {
      Cookie.set('username', username)
      Cookie.set('avatar', avatar)
    }
  },
  SET_USER_LOGOUT: (state, payload) => {
    state.isUserLoggedIn = false
    state.expiresIn = 0
    state.accessToken = ''
    state.tokenType = ''
    state.username = ''
    state.avatar = ''
    Cookie.remove('access_token')
    Cookie.remove('token_type')
    Cookie.remove('expires_in')
    Cookie.remove('username')
    Cookie.remove('avatar')
    // $nuxt.$router.push({ name: 'index' })
  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, context) {
    if (context.app.$cookies.get('access_token')) {
      const accessToken = context.app.$cookies.get('access_token')
      const tokenType = context.app.$cookies.get('token_type')
      const expiresIn = context.app.$cookies.get('expires_in')
      const username = context.app.$cookies.get('username')
      const avatar = context.app.$cookies.get('avatar')
      commit('SET_USER_LOGGEDIN', { access_token: accessToken, token_type: tokenType, expires_in: expiresIn })
      commit('SET_USER_INFO', { username, avatar })
      await dispatch('cart/getUserCart')
    }
  },
  async getUserInfo ({ commit, getters }) {
    try {
      const { data } = await this.$axios({
        baseURL: process.env.WEB_URL,
        url: '/api/me',
        method: 'get',
        params: { ...getters.token }
      })
      commit('SET_USER_INFO', data)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async login ({ commit }, payload) {
    try {
      const { data: loginData } = await this.$axios({
        baseURL: process.env.API_URL,
        url: '/auth/login',
        method: 'post',
        data: payload
      })
      commit('SET_USER_LOGGEDIN', loginData)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async logout ({ commit, getters }, payload) {
    await this.$axios({
      baseURL: process.env.WEB_URL,
      url: '/api/logout',
      method: 'post',
      data: {
        ...getters.token,
        data: payload
      }
    })
    commit('SET_USER_LOGOUT')
  }
}
