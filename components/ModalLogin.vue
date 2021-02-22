<template>
  <div :class="['modal', 'justify-center', 'items-center', {'flex': value}]">
    <div class="modal-background" @click="$emit('input', false)" />
    <div class="modal-content relative py-14 bg-white">
      <button
        class="modal-close is-large absolute right-4"
        aria-label="close"
        @click="$emit('input', false)"
      />
      <div class="mb-6">
        <img src="~/assets/img/logo.svg" class="block mx-auto" width="120" height="18">
      </div>
      <div class="flex justify-center mb-6">
        <button
          :class="[{'active': currentAction === 'login'}, {'text-gray-400':currentAction !== 'login'}]"
          class="button py-0 text-3xl font-bold border-0 shadow-none"
          @click="currentAction = 'login'"
        >
          <span class="py-4">登入</span>
        </button>
        <button
          :class="[{'active': currentAction === 'register'}, {'text-gray-400':currentAction !== 'register'}]"
          class="button py-0 text-3xl font-bold border-0 shadow-none"
          @click="currentAction = 'register'"
        >
          <span class="py-4">註冊</span>
        </button>
      </div>
      <ul class="mb-6">
        <li class="mb-4">
          <button class="button flex items-center mx-auto py-3 w-80 border-gray-400">
            <img src="~/assets/img/facebook.svg" class="mr-4" alt="Facebook">
            <p class="w-36 text-left text-gray-400">
              使用 Facebook 登入
            </p>
          </button>
        </li>
        <li class="mb-4">
          <button class="button flex items-center mx-auto py-3 w-80 border-gray-400">
            <img src="~/assets/img/google.svg" class="mr-4" alt="Google">
            <p class="w-36 text-left text-gray-400">
              使用 Google 登入
            </p>
          </button>
        </li>
        <li class="mb-4">
          <button class="button flex items-center mx-auto py-3 w-80 border-gray-400">
            <img src="~/assets/img/github.svg" class="mr-4" alt="Github">
            <p class="w-36 text-left text-gray-400">
              使用 Github 登入
            </p>
          </button>
        </li>
        <li>
          <button class="button flex items-center mx-auto py-3 w-80 border-gray-400">
            <img src="~/assets/img/linkedin.svg" class="mr-4" alt="LinkedIn">
            <p class="w-36 text-left text-gray-400">
              使用 LinkedIn 登入
            </p>
          </button>
        </li>
      </ul>
      <p class="mb-6 text-center text-gray-500">
        {{ `使用 HISKIO ID ${currentAction === 'login' ? '登入' : '註冊'}` }}
      </p>
      <form>
        <div v-show="currentAction === 'login'" class="field mx-auto w-80">
          <p class="control has-icons-left">
            <input v-model="form.id" class="input border-0 shadow-none bg-gray-100" type="text" placeholder="請輸入 HISKIO ID">
            <span class="icon is-small is-left">
              <fa :icon="['fas', 'user-circle']" class="text-gray-300" />
            </span>
          </p>
        </div>
        <div v-show="currentAction === 'login'" class="field mx-auto mb-5 w-80">
          <p class="control has-icons-left">
            <input v-model="form.password" class="input border-0 shadow-none bg-gray-100" type="password" placeholder="請輸入登入密碼">
            <span class="icon is-small is-left">
              <fa :icon="['fas', 'lock']" class="text-gray-300" />
            </span>
          </p>
        </div>
        <div class="field mx-auto mb-6 w-80">
          <label class="checkbox flex items-center">
            <fa v-if="form.agree" :icon="['fas', 'check-square']" class="mr-2 text-xl" />
            <fa v-else :icon="['fas', 'square']" class="mr-2 text-xl" />
            <input v-model="form.agree" type="checkbox" class="visibility-hidden">
            <p class="text-gray-500 text-sm">
              登入註冊即代表您同意<a href="javascript:;" class="text-gray-500 underline">使用者</a>及<a href="javascript:;" class="text-gray-500 underline">隱私權政策</a>
            </p>
          </label>
        </div>
        <div class="field mx-auto mb-5 w-80">
          <input
            type="button"
            :class="[{'hidden': currentAction !== 'login'}, {'block': currentAction === 'login'}]"
            class="button is-primary block w-full"
            value="登入"
          >
        </div>
        <a
          href="javascript:;"
          :class="[{'hidden': currentAction !== 'login'}, {'block': currentAction === 'login'}]"
          class="block text-center text-gray-400"
        >
          忘記密碼
        </a>
      </form>
    </div>
  </div>
</template>

<script>
/**
 * 登入 / 註冊的 modal
 */
export default {
  name: 'ModalLogin',
  props: {
    // modal 的顯示狀態
    value: {
      type: Boolean,
      required: true
    },
    // 操作動作
    action: {
      type: String,
      required: true
    }
  },
  data () {
    /**
     * @namespace
     * @property {string} currentAction - 目前正在操作的動作
     * @property {object} form - 登入表單
     * @property {boolean} form.agree - 同意條款
     * @property {string} form.id - hiskio 編號
     * @property {string} form.password - 密碼
     */
    return {
      currentAction: 'login',
      form: {
        agree: true,
        id: '',
        password: ''
      }
    }
  },
  watch: {
    action (newAction) {
      this.currentAction = newAction
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.modal-close {
  &::before,
  &::after {
    background-color: #333;
    border-radius: 0.25rem;
  }

  &::before {
    height: 0.25rem;
    width: 60%;
  }

  &::after {
    height: 60%;
    width: 0.25rem;
  }
}

.modal-content {
  background-image: url('~/assets/img/bg-modal.png');
  background-size: contain;
  height: 100vh;
  margin: 0;
  max-height: none;
  max-width: 450px;
  @media (min-width: 450px) {
    border-radius: 10px;
    height: auto;
    margin: 0 auto;
  }
}

.button.active {
  color: $primary;

  span {
    border-bottom: 3px solid $primary !important;
  }
}

.checkbox [class*='fa-'] {
  color: $primary;
}

</style>
