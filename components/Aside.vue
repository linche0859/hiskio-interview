<template>
  <aside :class="['aside', {'right-0': value}]">
    <slot />
  </aside>
</template>

<script>
/**
 * 側邊欄
 */
export default {
  name: 'Aside',
  props: {
    // 顯示狀態
    value: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.aside {
  background-color: #fff;
  box-shadow: 10px 0 20px 2px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  height: 100%;
  max-width: 375px;
  padding-top: 1rem;
  position: fixed;
  right: -375px;
  top: 0;
  transition: right 0.3s;
  width: 100%;
  z-index: 1;
}
</style>
