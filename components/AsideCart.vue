<template>
  <aside-component
    :value="value"
  >
    <header class="relative mb-6 z-10">
      <h2 class="text-center">
        購物車
      </h2>
      <button
        class="button absolute top-0 right-0 py-0 border-0 shadow-none"
        @click="$emit('input', !value)"
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
        <img :src="item.image" :alt="item.name" class="block mb-0 mr-2 w-36 h-20 rounded-lg object-cover">
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
</template>

<script>
import AsideComponent from '~/components/Aside'

/**
 * 購物車的側邊攔
 */
export default {
  name: 'AsideCart',
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
     * 已經加入購物車的編號列表
     * @returns {array}
     */
    cartInfo () {
      return this.$store.getters['cart/cartInfo']
    }
  }
}
</script>
