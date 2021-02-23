<template>
  <aside-component
    :value="value"
    class="aside-logged-in"
  >
    <button
      class="button block ml-auto mb-6 border-0 shadow-none"
      @click="$emit('input', !value)"
    >
      <fa :icon="['fas', 'times']" class="text-2xl text-gray-500" />
    </button>
    <div class="mb-6">
      <img :src="userInfo.avatar" alt="avatar" class="block mx-auto w-36 h-36 rounded-full object-cover">
    </div>
    <p class="pb-10 border-b text-center text-2xl">
      {{ userInfo.username }}
    </p>
    <ul class="list-none">
      <li><a href="javascript:;" class="block py-4 text-center text-xl text-primary hover:bg-gray-100">我的抵用券</a></li>
      <li><a href="javascript:;" class="block py-4 text-center text-xl text-primary hover:bg-gray-100">任務版</a></li>
      <li><a href="javascript:;" class="block py-4 text-center text-xl text-primary hover:bg-gray-100">訂單紀錄</a></li>
      <li><a href="javascript:;" class="block py-4 text-center text-xl text-primary hover:bg-gray-100">帳戶設定</a></li>
    </ul>
    <a
      href="javascript:;"
      class="absolute block left-0 bottom-6 w-full text-center text-xl text-gray-400"
      @click="$emit('logout')"
    >
      會員登出
    </a>
  </aside-component>
</template>

<script>
import AsideComponent from '~/components/Aside'

/**
 * 已經登入的帳戶側邊欄
 */
export default {
  name: 'AsideLoggedIn',
  components: {
    AsideComponent
  },
  props: {
    // 顯示狀態
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    /**
     * 使用者資訊
     * @returns {object}
     */
    userInfo () {
      return this.$store.getters.userInfo
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.aside-logged-in {
  img {
    border: 1px solid $primary;
    padding: 0.25rem;
  }
}
</style>
