<template>
  <div class="container">
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-0 list-none">
      <li v-for="course in courseList" :key="course.id">
        <CardCourse :course="course" @change-cart="changeCart" />
      </li>
    </ul>
  </div>
</template>

<script>
import { userComputed, cartComputed, cartMethods } from '~/assets/js/store-help'
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
    const { data } = await $axios({
      baseURL: process.env.API_URL,
      url: '/courses/fundraising',
      method: 'get'
    })
    return {
      courseList: data ?? []
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
    ...userComputed,
    ...cartComputed,
    /**
     * 使用者是否登入
     * @returns {boolean}
     */
    isUserLoggedIn () {
      return this.userInfo.isUserLoggedIn
    },
    /**
     * 已經加入購物車的編號列表
     * @returns {array}
     */
    addedCartIds () {
      return this.cartInfo.data.map(item => item.id)
    }
  },
  methods: {
    ...cartMethods,
    /**
     * 加入購物車事件
     * @param {number} courseId - 課程編號
     */
    async addCart (courseId) {
      const addedCartItems = this.addedCartIds.map(id => ({ id, coupon: '' }))
      await this['store/addCart']({
        items: [
          ...addedCartItems,
          { id: courseId, coupon: '' }
        ],
        coupon: ''
      })
    },
    /**
     * 移除購物車項目事件
     * @param {number} courseId - 課程編號
     */
    async deleteCart (courseId) {
      if (!this.isUserLoggedIn) {
        this['store/addCart']({
          items: this.addedCartIds
            .filter(item => parseInt(item) !== courseId)
            .map(item => ({ id: parseInt(item), coupon: '' })),
          coupon: ''
        })
        return
      }
      await this['store/deleteCart']({
        items: [{ id: courseId, coupon: '' }]
      })
      await this['store/getUserCart']()
    },
    /**
     * 變更購物車事件
     * @param {boolean} isAddedCart - 是否已經加入購物車
     * @param {number} courseId - 課程編號
     */
    changeCart ({ isAddedCart, courseId }) {
      if (isAddedCart) {
        this.deleteCart(courseId)
        return
      }
      this.addCart(courseId)
    }
  }
}
</script>

<style lang="scss" scoped></style>
