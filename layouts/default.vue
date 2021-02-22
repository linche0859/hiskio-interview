<template>
  <div>
    <Navbar
      @login="changeModalStatus"
      @register="changeModalStatus"
    />
    <Nuxt />
    <ModalLogin
      v-model="modal.status"
      :action="modal.action"
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
        status: true,
        action: 'login'
      }
    }
  },
  methods: {
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

<style></style>
