<script setup lang="ts">
  import { useClipboard, useStorage } from '@vueuse/core'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import containerAvatar from '@/components/container/container-avatar.vue'
  import buttonCancel from '@/components/control/button-cancel.vue'
  import buttonPrimary from '@/components/control/button-primary.vue'
  import buttonSecondary from '@/components/control/button-secondary.vue'
  import inputIndex from '@/components/input/input-index.vue'
  import ModalAvatar from '@/components/modal/modal-avatar.vue'
  import { useAuthModel } from '@/models/auth'
  import { useAuthStore } from '@/stores/auth'

  const router = useRouter()
  const authStore = useAuthStore()
  const authStorage = useStorage('auth', authStore.user)
  const { copy } = useClipboard()
  const { formRegister, attemptRegister, attemptLogin, resetForm } = useAuthModel()
  const modalAvatarRef = ref<InstanceType<typeof ModalAvatar>>()
  const step = ref(1)
  const state = ref<'new' | 'passkey'>('new')
  const passcode = ref('')
  const error = ref(false)
  const finalStep = ref(false)
  const passcodeCopied = ref(false)

  const setState = (selectedState: 'new' | 'passkey') => {
    state.value = selectedState
    nextStep()
    resetForm()
  }
  const nextStep = () => step.value++
  const previousStep = () => step.value--
  const newUserStep = async () => {
    if (formRegister.name == '') {
      error.value = true
      return
    }
    if (step.value < 3) {
      nextStep()
    } else {
      const response = await attemptRegister()
      if (response) {
        nextStep()
      }
    }
    if (step.value == 4) finalStep.value = true
  }
  const passcodeStep = async () => {
    authStore.user.passcode = passcode.value
    const response = await attemptLogin()
    if (response) {
      nextStep()
      finalStep.value = true
    }
  }
  const attemptChangeAvatar = () => {
    modalAvatarRef.value?.open(authStore.user.avatar)
  }
  const copyPasscode = () => {
    copy(authStore.user.passcode)
    passcodeCopied.value = true
  }
  const finish = () => {
    authStorage.value.id = authStore.user.id
    authStorage.value.name = authStore.user.name
    authStorage.value.passcode = authStore.user.passcode
    authStorage.value.avatar = authStore.user.avatar
    router.push({ name: 'dashboard' })
  }
</script>
<template>
  <div
    class="h-full bg-gradient-from-blue-300 bg-gradient-to-blue-700 bg-gradient-to-bl flex flex-col space-y-16 px-48 justify-center items-center"
  >
    <div>
      <img
        src="/images/logo.png"
        alt="logo"
        class="w-194 md:w-218 lg:w-232 xl:w-256"
      />
      <div class="text-center text14 text-yellow">Chat anonymously and have fun!</div>
    </div>
    <div
      class="p-24 bg-white rounded-8 flex flex-col space-y-12 items-center justify-center"
    >
      <template v-if="step == 1">
        <buttonPrimary
          class="w-256 p-4"
          @click="setState('new')"
        >
          Enter as new User
        </buttonPrimary>
        <buttonSecondary
          class="w-256 p-4"
          @click="setState('passkey')"
        >
          Enter using passkey
        </buttonSecondary>
      </template>
      <template v-if="step > 1">
        <template v-if="state == 'new'">
          <template v-if="step == 2">
            <div class="w-full">
              <label
                for="name"
                class="font-medium text12"
              >
                Nickname
              </label>
              <inputIndex
                name="name"
                class="w-full border border-gray-7 rounded-8 py-8 px-12 text10"
                :class="{ 'border-3 border-red-600': error }"
                placeholder="Pick a cool nickname"
                v-model="formRegister.name"
                @change="authStore.setUsername(formRegister.name)"
              ></inputIndex>
              <div class="text8">
                * Please note that you can't change your nickname later
              </div>
            </div>
          </template>
          <template v-if="step == 3">
            <div class="flex flex-col items-center">
              <label
                for="name"
                class="font-medium text12"
              >
                Avatar
              </label>
              <div
                class="relative cursor-pointer"
                @click="attemptChangeAvatar"
              >
                <containerAvatar
                  :avatar="authStore.getAvatar"
                  class="w-72 h-72"
                ></containerAvatar>
                <div
                  class="absolute rounded-full w-28 h-28 -bottom-4 -right-4 z-10 bg-white bg-op-70 flex justify-center items-center"
                >
                  <i class="i-fas-pen-to-square inline-block text-12"></i>
                </div>
              </div>
              <div class="text8">
                * Please note that you can't change your avatar later
              </div>
            </div>
          </template>
          <template v-if="step == 4">
            <div class="text16 font-medium">Your Passcode</div>
            <div class="flex space-x-8 justify-center items-center">
              <div class="text20 font-bold">{{ authStore.user.passcode }}</div>
              <i
                v-if="passcodeCopied"
                class="i-fas-check inline-block text-12 text-primary"
              ></i>
              <div
                v-else
                class="cursor-pointer"
                @click="copyPasscode"
                title="Copy Passcode"
              >
                <i class="i-fas-copy inline-block text-12 text-primary"></i>
              </div>
            </div>
            <div class="text8">
              * Please note you can only login to your account using your passcode
            </div>
          </template>
          <buttonPrimary
            v-if="!finalStep"
            class="w-256 p-4"
            @click="newUserStep"
          >
            Next
          </buttonPrimary>
        </template>
        <template v-if="state == 'passkey'">
          <template v-if="step == 2">
            <div class="w-full">
              <label
                for="passcode"
                class="font-medium text12"
              >
                Passcode
              </label>
              <inputIndex
                name="passcode"
                class="w-full border border-gray-7 rounded-8 py-8 px-12 text10"
                :class="{ 'border-3 border-red-600': error }"
                placeholder="Insert your passcode"
                v-model="passcode"
              ></inputIndex>
            </div>
          </template>
          <template v-if="step == 3">
            <div class="text20 font-medium text-primary">
              Welcome {{ authStore.user.name }}
            </div>
          </template>
          <buttonPrimary
            v-if="!finalStep"
            class="w-256 p-4"
            @click="passcodeStep"
          >
            Next
          </buttonPrimary>
        </template>
        <buttonPrimary
          v-if="finalStep"
          class="w-256 p-4"
          @click="finish"
        >
          Confirm
        </buttonPrimary>
        <buttonCancel
          v-else
          class="w-256 p-4"
          @click="previousStep"
        >
          Back
        </buttonCancel>
      </template>
    </div>
  </div>
  <ModalAvatar
    ref="modalAvatarRef"
    @submit="(val) => authStore.setAvatar(val)"
  ></ModalAvatar>
</template>
