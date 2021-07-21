export const state = () => ({
  counter: 0,
  title: 'Title',
  apps: [
    {
      id: Math.floor(Math.random() * 1001), icon: 'mdi-microsoft-windows', title: 'My Computer', type: 'startmenu', window: {
        show: false,
        fullscreen: false,
      },
    },
    {
      id: Math.floor(Math.random() * 1001), icon: 'mdi-magnify', title: 'Search', type: 'window', window: {
        show: false,
        fullscreen: false,
      },
    },
    {
      id: Math.floor(Math.random() * 1001), icon: 'mdi-folder', title: 'File Explorer', type: 'window', window: {
        show: false,
        fullscreen: false,
      },
    },
    {
      id: Math.floor(Math.random() * 1001), icon: 'mdi-microsoft-edge', title: 'Microsoft Edge', type: 'window', window: {
        show: false,
        fullscreen: false,
      },
    },
    {
      id: Math.floor(Math.random() * 1001), icon: 'mdi-cart', title: 'Microsoft Store', type: 'window', window: {
        show: false,
        fullscreen: false,
      },
    },
  ],
  windowList: [],
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
    const result = state.windowList.find((app) => {
      return app.id === id
    })
    result.window.show = !result.window.show
  },
  TOGGLE_FULLSCREEN(state, id) {
    // alert(id)
    const result = state.windowList.find((app) => {
      return app.id === id
    })
    result.window.fullscreen = !result.window.fullscreen
  },
  OPEN_APP(state, app) {
    state.windowList.push(app)
    // commit('TOGGLE_WINDOW', app.id)
  },
  CLOSE_APP(state, id) {
    // Remove items from array
    state.windowList = state.windowList.filter(item => item.id !== id)
  },
  IS_OPENED_APP(state, id) {
    // alert(id)
    const result = state.windowList.find((app) => {
      return app.id === id
    })
    return result
  },
}


export const actions = {
  toggleWindow({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit('TOGGLE_WINDOW', payload.id)
      resolve();
    })
  },
  toggleFullscreen({ commit }, payload) {
    commit('TOGGLE_FULLSCREEN', payload.id)
  },
  openApp({ state, commit }, app) {
    // console.log(state.windowList)
    const duplicateItem = state.windowList.find((item) => item.id === app.id)
    if (duplicateItem) {
      commit('TOGGLE_WINDOW', app.id)
      // alert('duplicate')

    } else {
      commit('OPEN_APP', app)
      commit('TOGGLE_WINDOW', app.id)
      // alert(state.windowList)

    }

  },
  closeApp({ commit, dispatch }, app) {
    // dispatch('toggleWindow', { id: app.id }).then(() => {
    //   commit('CLOSE_APP', app.id)
    // },1000)
    dispatch('toggleWindow', { id: app.id })
    setTimeout(() => {
      commit('CLOSE_APP', app.id)
    }, 100);
  },
  isAppOpened({ commit }, id) {
    commit('IS_OPENED_APP', id)
  }
}