import { defineStore } from 'pinia'

interface State {
  colorTemplate: ColorTemplateType[]
  days: string[]
  months: string[]
  publicAvatar: string[]
}

export const useListStore = defineStore('list', {
  state: (): State => {
    return {
      colorTemplate: [
        {
          background: 'fde6e3',
          text: 'e95c4a',
        },
        {
          background: 'ffedbb',
          text: 'f98f07',
        },
        {
          background: 'd3fde4',
          text: '05c475',
        },
        {
          background: 'c5e5fc',
          text: '1393e4',
        },
        {
          background: 'ded7fa',
          text: '946ae8',
        },
        {
          background: 'fce0fa',
          text: 'e055ca',
        },
      ],
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      publicAvatar: [
        //male avatar
        'public/18',
        'public/43',
        'public/22',
        'public/37',
        'public/42',
        'public/45',

        //female avatar
        'public/91',
        'public/95',
        'public/71',
        'public/63',
        'public/85',
        'public/66',
      ]
    }
  },
  getters: {},
  actions: {},
})
