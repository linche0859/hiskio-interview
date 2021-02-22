<template>
  <div class="container">
    <div class="modal">
      <div class="modal-background" />
      <div class="modal-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, consequatur!
        <!-- Any other Bulma elements you want -->
      </div>
      <button class="modal-close is-large" aria-label="close" />
    </div>
    <div>
      <Logo />
      <fa :icon="['fas', 'shopping-cart']" />
      <fa :icon="['fas', 'trash']" />
      <h1
        class="title"
      >
        hiskio-interview
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
      <ul class="flex list-none">
        <li><a href="">item</a></li>
        <li><a href="">item</a></li>
        <li><a href="">item</a></li>
        <li><a href="">item</a></li>
        <li><a href="">item</a></li>
      </ul>
      <nuxt-link to="/about" no-prefetch>
        Go About
      </nuxt-link>
      <img src="@/assets/img/demo.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  // layout: 'demo',
  head () {
    return {
      title: '首頁'
    }
  },
  created () {
    // eslint-disable-next-line no-console
    // console.log('this.axios', this.$axios)
  },
  mounted () {
    // this.$axios.get('http://localhost:3000/about').then((data) => {
    //   // eslint-disable-next-line no-console
    //   console.log(data.data)
    // })
  }
}
</script>

<style lang="scss">
// .container {
//   align-items: center;
//   display: flex;
//   justify-content: center;
//   margin: 0 auto;
//   min-height: 100vh;
//   text-align: center;
// }

// .title {
//   color: #35495e;
//   display: block;
//   font-family:
//     'Quicksand',
//     'Source Sans Pro',
//     -apple-system,
//     BlinkMacSystemFont,
//     'Segoe UI',
//     Roboto,
//     'Helvetica Neue',
//     Arial,
//     sans-serif;
//   font-size: 100px;
//   font-weight: 300;
//   letter-spacing: 1px;
// }

// .subtitle {
//   color: #526488;
//   font-size: 42px;
//   font-weight: 300;
//   padding-bottom: 15px;
//   word-spacing: 5px;
// }

// .links {
//   padding-top: 15px;
// }
</style>
