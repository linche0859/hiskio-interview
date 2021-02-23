<template>
  <div>
    <Navbar
      @login="changeModalStatus"
      @register="changeModalStatus"
      @logout="logout"
    />
    <main class="main">
      <Nuxt />
    </main>
    <ModalLogin
      v-model="modal.status"
      :action="modal.action"
      @login="login"
    />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import ModalLogin from '~/components/ModalLogin'

/**
 * 預設的 layout 模板
 */
export default {
  components: {
    Navbar,
    ModalLogin
  },
  data () {
    /**
     * @namespace
     * @property {object} modal - modal 資訊
     * @property {boolean} modal.status - 顯示狀態
     * @property {string} modal.action - 操作動作
     */
    return {
      modal: {
        status: false,
        action: 'login'
      }
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
    logout () {
      this.$store.dispatch('logout', {})
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
