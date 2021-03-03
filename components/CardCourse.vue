<template>
  <div class="card">
    <div class="card-image">
      <figure class="image relative hidden lg:block">
        <img :src="course.image" alt="course image" class="block mb-0">
        <div class="absolute inset-0 flex justify-end items-end p-2 bg-transparent">
          <fa :icon="['far', 'bookmark']" class="mr-2 text-xl text-white cursor-pointer hover:text-yellow-500" />
          <fa
            :icon="['fas', 'shopping-cart']"
            class="text-xl cursor-pointer hover:text-yellow-500"
            :class="[{'text-white': !isAddedCart}, {'text-yellow-500': isAddedCart}]"
            @click="$emit('change-cart', {courseId: course.id, isAddedCart})"
          />
        </div>
      </figure>
    </div>
    <div class="card-content flex flex-col p-2">
      <div class="media items-center mb-2 lg:order-2">
        <div class="media-left lg:hidden">
          <figure class="image">
            <img :src="course.image" alt="course image" class="block rounded-lg">
          </figure>
        </div>
        <div class="media-content flex flex-col">
          <div class="flex items-center justify-between lg:flex-col mb-2 lg:order-2">
            <p class="mr-2 text-sm lg:mb-2 lg:w-full lg:text-right">
              已募資{{ fundsRaisedPercenatge }}%
            </p>
            <progress
              class="progress is-small w-1/2 lg:w-full"
              :class="[{'is-danger': fundsRaisedPercenatge < 100}, {'is-success': fundsRaisedPercenatge === 100}]"
              :value="fundsRaisedPercenatge"
              max="100"
            />
          </div>
          <div class="flex items-center mb-2 lg:order-1">
            <img :src="course.lecturers[0].avatar" alt="lecturers avatar" class="mr-2 w-6 h-6 lg:w-8 lg:h-8 rounded-full object-cover">
            <p class="title text-base text-gray-400 font-normal">
              {{ course.lecturers[0].username }}
            </p>
          </div>
          <p class="lg:order-3">
            <span class="lg:text-2xl">${{ course.price }}</span>
            <del class="text-gray-400">${{ course.fixed_price }}</del>
          </p>
        </div>
      </div>
      <div class="content overflow-ellipsis overflow-hidden line-clamp-1 lg:mb-2 lg:line-clamp-2 lg:text-xl lg:order-1">
        {{ course.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { cartComputed } from '~/assets/js/store-help'

/**
 * 課程的卡片組件
 */
export default {
  name: 'CardCourse',
  props: {
    // 課程資訊
    course: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...cartComputed,
    /**
     * 募資的百分比
     * @returns {number}
     */
    fundsRaisedPercenatge () {
      const percent = (this.course.consumers / this.course.fundraising_tickets) * 100
      if (percent > 100) { return 100 }
      return Math.round(percent)
    },
    /**
     * 是否已經加入購物車
     * @returns {boolean}
     */
    isAddedCart () {
      return this.cartInfo.data.some(item => parseInt(item.id) === this.course.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.media-left img {
  width: 140px;
}

.card-image {
  &:hover {
    img {
      filter: brightness(0.5);
    }

    svg {
      display: block;
    }
  }

  svg {
    display: none;
  }
}
</style>
