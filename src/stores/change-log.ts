import { defineStore } from 'pinia'

interface State {
  avatar: string
  name: string
  logs: ChangeLogType[]
}
export const useLogStore = defineStore('Log', {
  state: (): State => {
    return {
      avatar: 'https://avatar.iran.liara.run/public/job/operator/male',
      name: 'Change Log',
      logs: [
        {
          version: 'v0.01.00',
          date: '2025-05-22 21:47:38',
          message: 'Version v0.01.00\n- Initial Release\n- Still interface only',
        },
        {
          version: 'v1.00.00',
          date: '2025-05-25 15:51:24',
          message: 'Version v1.00.00\n- Add axios and API\n- Add pusher\n- Add chat room',
        },
      ],
    }
  },
})
