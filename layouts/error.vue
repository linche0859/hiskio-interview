<template>
  <div class="content grid place-content-center place-items-center mx-auto w-3/4">
    <template v-if="error.statusCode === 404">
      <img
        src="~/assets/img/bg-404.svg"
        alt="page not find"
        class="mb-2"
      >
      <p class="mb-10 text-center text-lg text-gray-500">
        糟糕！似乎找不到你要的網頁...
      </p>
    </template>
    <NuxtLink
      to="/"
      class="button is-primary px-9"
    >
      回首頁
    </NuxtLink>
  </div>
</template>

<script>
/**
 * 錯誤頁面
 */
export default {
  layout: 'default',
  props: {
    error: {
      type: Object,
      default: () => ({ statusCode: 404 })
    }
  },
  head () {
    return {
      title: '錯誤'
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 52px);
}
</style>
