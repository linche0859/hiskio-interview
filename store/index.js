import Cookie from 'js-cookie'
// import jwtDecode from 'jwt-decode'

export const state = () => ({
  // 會員是否登入
  isUserLoggedIn: false,
  // 登入的到期時間
  // expiresIn: 0,
  // // 訪問金鑰
  // accessToken: '',
  // // 金鑰類型
  // tokenType: '',
  // 使用者名稱
  username: '',
  // 使用者大頭照
  avatar: ''
})

export const getters = {
}

export const mutations = {
  SET_USER_LOGGEDIN: (state, payload) => {
    const { access_token: accessToken = '', token_type: tokenType = '', expires_in: expiresIn = 0 } = payload
    state.isUserLoggedIn = true

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
  nuxtServerInit ({ commit }, context) {
    if (context.app.$cookies.get('access_token')) {
      const username = context.app.$cookies.get('username')
      const avatar = context.app.$cookies.get('avatar')
      commit('SET_USER_INFO', { username, avatar })
    }
  },
  async loginMember ({ commit }, payload) {
    try {
      const { data: loginData } = await this.$axios({
        baseURL: process.env.API_URL,
        url: '/auth/login',
        method: 'post',
        data: payload
      })
      const { data: memberData } = await this.$axios({
        baseURL: process.env.WEB_URL,
        url: '/api/me',
        method: 'get',
        params: { accessToken: loginData.access_token }
      })
      commit('SET_USER_LOGGEDIN', loginData)
      commit('SET_USER_INFO', memberData)
      return memberData
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
