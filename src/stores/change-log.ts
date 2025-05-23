import { defineStore } from 'pinia'

interface State {
  avatar: string
  username: string
  logs: ChangeLogType[]
}
export const useLogStore = defineStore('Log', {
  state: (): State => {
    return {
      avatar: 'https://avatar.iran.liara.run/public/job/operator/male',
      username: 'Change Log',
      logs: [
        {
          version: 'v0.01.00',
          date: '2025-05-22 21:47:38',
          message: 'Version v0.01.00\n- Initial Release\n- Still interface only',
        },
      ],
    }
  },
})
