<template>
  <nav class="navbar container fixed -inset-x-0 mx-auto" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link to="/" class="navbar-item pl-4 lg:pl-0 md:pr-8">
        <img src="~/assets/img/logo.svg">
      </nuxt-link>
      <div class="flex items-center">
        <fa :icon="['fas', 'search']" class="mr-2 text-gray-600" />
        <input
          class="input is-small border-0 outline-none shadow-none rounded-none bg-gray-100"
          type="text"
          placeholder="搜尋"
        >
      </div>
      <div class="flex items-center ml-auto">
        <a class="navbar-item lg:hidden" @click="$emit('change-aside-cart-status')">
          <fa
            :icon="['fas', 'shopping-cart']"
            :class="[{'text-gray-400': !cartInfo.data.length}, {'text-primary': cartInfo.data.length}]"
          />
          <span class="badge" />
        </a>
        <!-- 漢堡選單 -->
        <a
          role="button"
          class="navbar-burger ml-0 hover:bg-transparent"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasic"
          @click="expand = !expand"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
    </div>
    <input v-model="expand" type="checkbox" class="navbar-menu-toggle visibility-hidden">
    <div id="navbarBasic" class="navbar-menu">
      <div v-if="isUserLoggedIn" class="border-b lg:hidden">
        <a class="navbar-item flex items-center">
          <img :src="userInfo.avatar" alt="avatar" class="mr-2 w-8 h-8 rounded-full object-cover">
          <p>{{ userInfo.username }}</p>
        </a>
      </div>
      <div class="navbar-end border-b lg:border-b-0">
        <a class="navbar-item">
          我想開課
        </a>
        <a v-if="isUserLoggedIn" class="navbar-item hidden lg:flex">
          任務版
        </a>
        <a v-if="isUserLoggedIn" class="navbar-item">
          我的課程
        </a>
        <a class="navbar-item hidden lg:flex" @click="$emit('change-aside-cart-status')">
          <fa
            :icon="['fas', 'shopping-cart']"
            :class="[{'text-gray-400': !cartInfo.data.length}, {'text-primary': cartInfo.data.length}]"
          />
          <span class="badge" />
        </a>
        <a class="navbar-item">
          <span class="inline-block lg:hidden">常見問題</span>
          <fa :icon="['fas', 'question-circle']" class="text-gray-400" />
        </a>
        <a
          v-if="isUserLoggedIn"
          class="navbar-item hidden lg:flex"
          @click="$emit('change-aside-logged-in-status')"
        >
          <img :src="userInfo.avatar" alt="avatar" class="w-8 h-8 rounded-full object-cover">
        </a>
      </div>
      <div v-if="isUserLoggedIn" class="lg:hidden">
        <a class="navbar-item text-gray-400" @click="$emit('logout')">
          登出
        </a>
      </div>
      <div v-else class="navbar-end ml-0">
        <div class="navbar-item pt-0 lg:pr-0">
          <div class="buttons">
            <a
              class="button is-primary is-outlined mb-0 mr-0 lg:mr-5"
              @click="$emit('login', 'login')"
            >
              登入
            </a>
            <a
              class="button is-primary mb-0"
              @click="$emit('register', 'register')"
            >
              註冊
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
/**
 * 導覽列
 */
export default {
  name: 'Navbar',
  data () {
    /**
     * @namespace
     * @property {boolean} expand - 是否展開導覽選單
     */
    return {
      expand: false
    }
  },
  computed: {
    /**
     * 使用者是否登入
     * @returns {boolean}
     */
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    /**
     * 使用者資訊
     * @returns {object}
     */
    userInfo () {
      return this.$store.getters.userInfo
    },
    /**
     * 購物車資訊
     * @returns {array}
     */
    cartInfo () {
      return this.$store.getters['cart/cartInfo']
    }
  },
  watch: {
    isUserLoggedIn (loggedIn) {
      this.expand = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.navbar-brand {
  /deep/ img {
    @media (min-width: $tablet) {
      height: 15px;
      width: 100px;
    }
  }
}

.navbar-item:hover {
  background-color: transparent;
  color: $primary;
}

.input:focus {
  box-shadow: inset 0 -1px #aaa !important;
}

.navbar-menu-toggle {
  &:checked ~ .navbar-menu {
    display: block;
    height: 100vh;
    padding-bottom: 0;
    padding-top: 0;
    position: fixed;
    width: 100%;

    @media (min-width: $desktop) {
      display: flex;
      height: auto;
      position: relative;
      width: auto;
    }
  }
}

.navbar-end .button.is-primary {
  @media (max-width: 1023px) {
    background-color: transparent;
    border-color: transparent;
    color: inherit;
    display: block;
    padding-left: 0;
    padding-right: 0;
    text-align: left;
    width: 100%;

    &:hover {
      background-color: transparent;
      border-color: transparent;
      color: inherit;
    }
  }
}

// 購物車有商品時的顯示
.fa-shopping-cart.text-primary + .badge {
  background-color: #f00;
  border-radius: 50%;
  height: 6px;
  position: absolute;
  right: 12px;
  top: 8px;
  width: 6px;
  @media (min-width: $desktop) {
    top: 17px;
  }
}
</style>
