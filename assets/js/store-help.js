import { mapGetters, mapActions, createNamespacedHelpers } from 'vuex'
const { mapGetters: cartGetters, mapActions: cartMapActions } = createNamespacedHelpers('cart')

// 使用者
export const userComputed = {
  ...mapGetters(['userInfo'])
}
export const userMethods = mapActions({
  'store/getUserInfo': 'getUserInfo',
  'store/login': 'login',
  'store/logout': 'logout'
})

// 購物車
export const cartComputed = {
  ...cartGetters(['cartInfo'])
}
export const cartMethods = cartMapActions({
  'store/getUserCart': 'getUserCart',
  'store/addCart': 'addCart',
  'store/deleteCart': 'deleteCart'
})
