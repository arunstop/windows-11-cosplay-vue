export const state = () => ({
  counter: 0,
  title: 'Title',
  trays: [
    {
      icon: 'mdi-chevron-up', title: '', window: {
        show: false,
        fullscreen: false,
      },
    },
    {
      icon: 'mdi-wifi', title: '', window: {
        show: false,
        fullscreen: false,
      },
    },
    {
      icon: 'mdi-volume-high', title: '', window: {
        show: false,
        fullscreen: false,
      },
    },
    {
      icon: 'mdi-battery-high', title: '', window: {
        show: false,
        fullscreen: false,
      }
    },
  ],
  drawerState: false

})

export const mutations = {

  toggleDrawerState(state, data) {
    state.drawerState = data
  },
}

export const getters = {
  drawerState: (state) => state.drawerState,
  dateNow: () => {
    const now = new Date()
    const addZero= (x)=> {
      if (x < 10) {
        x = '0' + x
      }
      return x
    }
    return {
      hours:
        addZero(now.getHours()) + ':' + addZero(now.getMinutes()),
      fullDate:
        addZero(now.getDate()) +
        '/' +
        addZero(now.getMonth() + 1) +
        '/' +
        now.getFullYear(),
    }
  }
}

export const setters = {

}


export const actions = {
}