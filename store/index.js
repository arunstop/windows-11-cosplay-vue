export const state = () => ({
  counter: 0,
  title: 'Title',
  apps: [
    {
      id: Math.floor(Math.random() * 1001), icon: 'mdi-microsoft-windows', title: 'My Computer', window: {
        show: false,
        fullscreen: false,
      },
    },
    {
      id: Math.floor(Math.random() * 1001), icon: 'mdi-magnify', title: 'Search', window: {
        show: false,
        fullscreen: false,
      },
    },
    {
      id: Math.floor(Math.random() * 1001), icon: 'mdi-folder', title: 'File Explorer', window: {
        show: false,
        fullscreen: false,
      },
    },
    {
      id: Math.floor(Math.random() * 1001), icon: 'mdi-microsoft-edge', title: 'Microsoft Edge', window: {
        show: false,
        fullscreen: false,
      },
    },
    {
      id: Math.floor(Math.random() * 1001), icon: 'mdi-cart', title: 'Microsoft Store', window: {
        show: false,
        fullscreen: false,
      },
    },
  ],
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
  dialog: {
    show: false,
    fullscreen: false,
  }

})

export const mutations = {
  
  TOGGLE_WINDOW(state, id) {
    // alert(id)
    const result = state.apps.find((app) => {
      return app.id === id
    })
    result.window.show = !result.window.show
  },
  TOGGLE_FULLSCREEN(state, id) {
    // alert(id)
    const result = state.apps.find((app) => {
      return app.id === id
    })
    result.window.fullscreen = !result.window.fullscreen
  },
}


export const actions = {
  toggleWindow({ commit }, payload) {
    commit('TOGGLE_WINDOW', payload.id)
  },
  toggleFullscreen({ commit }, payload) {
    commit('TOGGLE_FULLSCREEN', payload.id)
  }
}