<template>
  <nav class="navbar container fixed -inset-x-0 mx-auto" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link to="/" class="navbar-item md:pl-4 md:pr-8">
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
        <a class="navbar-item lg:hidden">
          <fa :icon="['fas', 'shopping-cart']" class="text-gray-400" />
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
      <div class="navbar-end border-b lg:border-b-0">
        <a class="navbar-item">
          我要開課
        </a>
        <a class="navbar-item hidden lg:flex">
          <fa :icon="['fas', 'shopping-cart']" class="text-gray-400" />
        </a>
        <a class="navbar-item">
          <span class="inline-block lg:hidden">常見問題</span>
          <fa :icon="['fas', 'question-circle']" class="text-gray-400" />
        </a>
      </div>
      <div class="navbar-end ml-0">
        <div class="navbar-item pt-0">
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
  &:checked + .navbar-menu {
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

.button.is-primary {
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
</style>
