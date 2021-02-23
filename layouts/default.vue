<template>
  <div>
    <Navbar
      @login="changeModalStatus"
      @register="changeModalStatus"
      @logout="logout"
      @change-aside-logged-in-status="asideLoggedInStatus = !asideLoggedInStatus"
      @change-aside-cart-status="asideCartStatus = !asideCartStatus"
    />
    <main class="main">
      <Nuxt />
    </main>
    <ModalLogin
      v-model="modal.status"
      :action="modal.action"
      @login="login"
    />
    <AsideLoggedIn
      v-model="asideLoggedInStatus"
      @logout="logout"
    />
    <AsideCart
      v-model="asideCartStatus"
    />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import ModalLogin from '~/components/ModalLogin'
import AsideLoggedIn from '~/components/AsideLoggedIn'
import AsideCart from '~/components/AsideCart'

/**
 * 預設的 layout 模板
 */
export default {
  components: {
    Navbar,
    ModalLogin,
    AsideLoggedIn,
    AsideCart
  },
  data () {
    /**
     * @namespace
     * @property {boolean} asideLoggedInStatus - 已經登入帳戶側邊欄的顯示狀態
     * @property {boolean} asideCartStatus - 購物車側邊欄的顯示狀態
     * @property {object} modal - modal 資訊
     * @property {boolean} modal.status - 顯示狀態
     * @property {string} modal.action - 操作動作
     */
    return {
      asideLoggedInStatus: false,
      asideCartStatus: false,
      modal: {
        status: false,
        action: 'login'
      }
    }
  },
  computed: {
    /**
     * 使用者是否登入
     * @returns {boolean}
     */
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    }
  },
  watch: {
    isUserLoggedIn (loggedIn) {
      this.asideLoggedInStatus = false
      this.asideCartStatus = false
    }
  },
  methods: {
    /**
     * 登入事件
     * @param {object} data - 登入資訊
     */
    async login (data) {
      try {
        await this.$store.dispatch('login', {
          account: data.id,
          password: data.password
        })
        await this.$store.dispatch('getUserInfo')
        await this.$store.dispatch('cart/getUserCart')
        this.changeModalStatus()
      } catch (e) {
        if (typeof e.message === 'string') {
          alert(e.message)
          return
        }
        const { message: { account = '', password = '' } } = e
        alert(account || password)
      }
    },
    /**
     * 登出事件
     */
    async logout () {
      await this.$store.dispatch('logout', {})
      await this.$store.dispatch('cart/getUserCart')
    },
    /**
     * 變更 modal 的狀態
     * @param {string} action - 操作動作
     */
    changeModalStatus (action = 'login') {
      this.modal.status = !this.modal.status
      this.modal.action = action
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding-top: 52px;
}
</style>
