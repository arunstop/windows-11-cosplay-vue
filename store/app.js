export const state = () => ({
  appItemList: [
    { icon: 'mdi-microsoft-edge', title: 'Edge' },
    { icon: 'mdi-microsoft-word', title: 'Word' },
    { icon: 'mdi-microsoft-powerpoint', title: 'PowerPoint' },
    { icon: 'mdi-email-outline', title: 'Mail' },
    { icon: 'mdi-check-circle', title: 'To Do' },
    { icon: 'mdi-cart', title: 'Microsoft Store' },
    { icon: 'mdi-image', title: 'Photos' },
    { icon: 'mdi-cellphone', title: 'Your Phone' },
    { icon: 'mdi-scissors-cutting', title: 'Snipping Tool' },
    { icon: 'mdi-twitter', title: 'Twitter' },
    { icon: 'mdi-skype', title: 'Skype' },
    { icon: 'mdi-microsoft-xbox', title: 'Xbox' },
    { icon: 'mdi-whatsapp', title: 'WhatsApp' },
    { icon: 'mdi-microsoft-excel', title: 'Excel' },
    { icon: 'mdi-spotify', title: 'Spotify' },
    { icon: 'mdi-microsoft-visual-studio-code', title: 'VS Code' },
    { icon: 'mdi-github', title: 'Github' },
    { icon: 'mdi-discord', title: 'Discord' },
    {
      id: Math.floor(Math.random() * 1001), icon: 'mdi-microsoft-windows', title: 'My Computer', type: 'startmenu', taskbar: true, default: true, window: {
        show: false,
        fullscreen: false,
      },
    },
    {
      id: Math.floor(Math.random() * 1001), icon: 'mdi-magnify', title: 'Search', type: 'searchpanel', taskbar: true, default: true, window: {
        show: false,
        fullscreen: false,
      },
    },
    {
      id: 'wp', icon: 'mdi-view-dashboard', title: 'Widgets', type: 'widgetpanel', taskbar: true, default: true, window: {
        show: false,
        fullscreen: false,
      },
    },
    {
      id: Math.floor(Math.random() * 1001), icon: 'mdi-folder', title: 'File Explorer', type: 'window', taskbar: true, window: {
        show: false,
        fullscreen: false,
      },
    },
    {
      id: Math.floor(Math.random() * 1001), icon: 'mdi-microsoft-edge', title: 'Microsoft Edge', type: 'window', taskbar: true, window: {
        show: false,
        fullscreen: false,
      },
    },
    {
      id: Math.floor(Math.random() * 1001), icon: 'mdi-cart', title: 'Microsoft Store', type: 'window', taskbar: true, window: {
        show: false,
        fullscreen: false,
      },
    },
  ],
  recentItemList: [
    { icon: 'mdi-buffer', title: 'WinRAR', lastOpened: 'Recently added' },
    { icon: 'mdi-steam', title: 'Steam', lastOpened: 'Yesterday' },
    {
      icon: 'mdi-microsoft-powerpoint',
      title: 'Monthly Presentation.pptx',
      lastOpened: '3 days ago',
    },
    { icon: 'mdi-movie-play', title: 'Beach.mp4', lastOpened: 'Jul 17' },
    {
      icon: 'mdi-music-circle',
      title: 'Coldplay - Every Teardrop Is a Waterfall.mp3',
      lastOpened: 'Jun 6',
    },
    { icon: 'mdi-image', title: 'Sea.png', lastOpened: 'Jun 1' },
  ],
  windowList: []

})

export const getters = {
  taskbarApps: (state) => {
    return state.appItemList.filter((appItem) => {
      return appItem.taskbar
    })
  },
  startMenuApps: (state) => {
    return state.appItemList.filter((appItem) => {
      return !appItem.taskbar
    })
  },
  windowState: (state) => (id)=>{
    const result = state.windowList.find((app) => {
      return app.id === id
    })
    return result.window.show
  }
}

export const mutations = {
  toggleState(state, data) {
    // console.log(data)
    const result = state.windowList.find((app) => {
      return app.id === data.id
    })
    result.window.show = data.value
    // console.log(data.id)
    // console.log(result.window.show)
  },
  OPEN_DEFAULT_APPS(state) {
    state.windowList = state.appItemList.filter((appItem) => appItem.default)
    // console.log(state.windowList)
  },

  TOGGLE_WINDOW(state, id) {
    const result = state.windowList.find((app) => {
      return app.id === id
    })
    // console.log(state.windowList)
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
  openDefaultApps({ commit }) {
    commit('OPEN_DEFAULT_APPS')
  },
  toggleWindow({ commit }, payload) {
    commit('TOGGLE_WINDOW', payload.id)
  },
  toggleFullscreen({ commit }, payload) {
    commit('TOGGLE_FULLSCREEN', payload.id)
  },
  openApp({ state, commit }, app) {
    // console.log(state.windowList)
    // console.log(app)
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