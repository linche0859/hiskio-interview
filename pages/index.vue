<template>
  <div class="container">
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-0 list-none">
      <li v-for="course in courseList" :key="course.id">
        <CardCourse :course="course" @add-cart="addCart" />
      </li>
    </ul>
  </div>
</template>

<script>
import CardCourse from '~/components/CardCourse'

/**
 * 首頁
 */
export default {
  name: 'Index',
  components: {
    CardCourse
  },
  async asyncData ({ $axios }) {
    try {
      const { data } = await $axios({
        baseURL: process.env.API_URL,
        url: '/courses/fundraising',
        method: 'get'
      })
      return {
        courseList: data
      }
    } catch (e) {
      if (e.message) { alert(e.message) }
    }
  },
  data () {
    /**
     * @namespace
     * @property {array} courseList - 課程列表
     */
    return {
      courseList: []
    }
  },
  head () {
    return {
      title: '首頁'
    }
  },
  computed: {
    /**
     * 已經加入購物車的編號列表
     * @returns {array}
     */
    addedCartIds () {
      return this.$store.getters['cart/cartInfo'].data.map(item => item.id)
    }
  },
  methods: {
    /**
     * 加入購物車事件
     * @param {number} courseId - 課程編號
     */
    async addCart (courseId) {
      try {
        const addedCartItems = this.addedCartIds.map(id => ({ id, coupon: '' }))
        await this.$store.dispatch('cart/addCart', {
          items: [
            ...addedCartItems,
            { id: courseId, coupon: '' }
          ],
          coupon: ''
        })
      } catch (e) {
        if (e.message) { alert(e.message) }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
