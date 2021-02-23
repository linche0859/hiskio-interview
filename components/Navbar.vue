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
        <a class="navbar-item lg:hidden" @click="cartExpand = !cartExpand">
          <fa
            :icon="['fas', 'shopping-cart']"
            :class="[{'text-gray-400': !cartInfo.data.length}, {'text-primary': cartInfo.data.length}]"
          />
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
        <a class="navbar-item hidden lg:flex" @click="cartExpand = !cartExpand">
          <fa
            :icon="['fas', 'shopping-cart']"
            :class="[{'text-gray-400': !cartInfo.data.length}, {'text-primary': cartInfo.data.length}]"
          />
        </a>
        <a class="navbar-item">
          <span class="inline-block lg:hidden">常見問題</span>
          <fa :icon="['fas', 'question-circle']" class="text-gray-400" />
        </a>
        <a
          v-if="isUserLoggedIn"
          class="navbar-item hidden lg:flex"
          @click="accountExpand = !accountExpand"
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
    <!-- 已登入的帳號側邊選單 -->
    <aside-component
      v-if="isUserLoggedIn"
      v-model="accountExpand"
      class="aside-menu"
    >
      <button
        class="button block ml-auto mb-6 border-0 shadow-none"
        @click="accountExpand = !accountExpand"
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
    <!-- 購物車側邊選單 -->
    <aside-component
      v-model="cartExpand"
    >
      <header class="relative mb-6 z-10">
        <h2 class="text-center">
          購物車
        </h2>
        <button
          class="button absolute top-0 right-0 py-0 border-0 shadow-none"
          @click="cartExpand = !cartExpand"
        >
          <fa :icon="['fas', 'times']" class="text-2xl text-gray-500" />
        </button>
      </header>
      <div
        v-if="!cartInfo.data.length"
        class="absolute -inset-0 flex justify-center items-center flex-col"
      >
        <img src="~/assets/img/bg-empty-cart.svg" class="mb-10 w-3/4" alt="empty cart">
        <p class="mb-10 text-center text-sm text-gray-400">
          購物車裡是空的，<br>去逛逛喜歡的課程吧！
        </p>
        <button class="button is-primary w-48">
          前往探索課程
        </button>
      </div>
      <ul v-else class="px-2 list-none">
        <li
          v-for="item in cartInfo.data"
          :key="item.id"
          class="flex items-center mb-2 pb-2 border-b"
        >
          <img :src="item.image" :alt="item.name" class="block mb-0 mr-2 w-36 w-20 rounded-lg object-cover">
          <div class="mr-2">
            <p class="mb-4 overflow-ellipsis overflow-hidden line-clamp-2">
              {{ item.name }}
            </p>
            <p class="font-bold text-red-500">
              $ {{ item.total }}
              <span>募資課程</span>
            </p>
          </div>
          <fa :icon="['fas', 'trash']" class="self-start text-xl text-gray-300 cursor-pointer hover:text-red-500" />
        </li>
      </ul>
      <a
        v-if="cartInfo.data.length"
        href="javascript:;"
        class="button is-primary absolute inset-x-0 bottom-0 py-4 text-lg rounded-none"
      >
        <fa :icon="['fas', 'shopping-cart']" class="mr-4" />
        前往購物車
      </a>
    </aside-component>
  </nav>
</template>

<script>
import AsideComponent from '~/components/Aside'

/**
 * 導覽列
 */
export default {
  name: 'Navbar',
  components: {
    AsideComponent
  },
  data () {
    /**
     * @namespace
     * @property {boolean} expand - 是否展開導覽選單
     * @property {boolean} accountExpand - 電腦版的是否展開帳號側邊選單
     * @property {boolean} cartExpand - 是否展開購物車側邊選單
     */
    return {
      expand: false,
      accountExpand: false,
      cartExpand: false
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
     * 已經加入購物車的編號列表
     * @returns {array}
     */
    cartInfo () {
      return this.$store.getters['cart/cartInfo']
    }
  },
  watch: {
    isUserLoggedIn (loggedIn) {
      this.expand = false
      this.accountExpand = false
      this.cartExpand = false
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

// 已登入的側邊選單
.aside-menu {
  img {
    border: 1px solid $primary;
    padding: 0.25rem;
  }
}

// 購物車有商品時的顯示
.fa-shopping-cart.text-primary {
  position: relative;

  &::after {
    background-color: #f00;
    border-radius: 50%;
    content: '';
    height: 0.25rem;
    position: absolute;
    right: 0;
    top: 0;
    width: 0.25rem;
  }
}
</style>
