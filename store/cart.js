export const state = () => ({
  globalCoupon: {},
  // 小計
  subtotal: 0,
  // 總金額
  total: 0,
  // 購物車清單
  cartList: []
})

export const getters = {
  cartInfo: (state) => {
    return {
      globalCoupon: state.globalCoupon,
      subtotal: state.subtotal,
      total: state.total,
      data: state.cartList
    }
  }
}

export const mutations = {
  SET_CART: (state, payload) => {
    const { data = [], global_coupon: globalCoupon = {}, subtotal = 0, total = 0 } = payload
    state.globalCoupon = globalCoupon
    state.subtotal = subtotal
    state.total = total
    state.cartList = data
  }
}

export const actions = {
  async getUserCart ({ commit, dispatch }) {
    await dispatch('addCart', {
      items: [],
      coupon: ''
    })
  },
  async addCart ({ commit, rootGetters }, payload) {
    const { data } = await this.$axios({
      baseURL: process.env.WEB_URL,
      url: '/api/carts',
      method: 'post',
      data: {
        ...rootGetters.token,
        data: payload
      }
    })
    commit('SET_CART', data)
  }
}
