export const state = () => ({
  appItemList: [
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-microsoft-edge', title: 'Edge' },
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-microsoft-word', title: 'Word' },
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-microsoft-powerpoint', title: 'PowerPoint' },
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-email-outline', title: 'Mail' },
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-check-circle', title: 'To Do' },
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-cart', title: 'Microsoft Store' },
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-image', title: 'Photos' },
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-cellphone', title: 'Your Phone' },
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-scissors-cutting', title: 'Snipping Tool' },
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-twitter', title: 'Twitter' },
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-skype', title: 'Skype' },
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-microsoft-xbox', title: 'Xbox' },
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-whatsapp', title: 'WhatsApp' },
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-microsoft-excel', title: 'Excel' },
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-spotify', title: 'Spotify' },
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-microsoft-visual-studio-code', title: 'VS Code' },
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-github', title: 'Github' },
    { id: Math.floor(Math.random() * 1001), icon: 'mdi-discord', title: 'Discord' },
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
      id: Math.floor(Math.random() * 1001), icon: 'mdi-view-dashboard', title: 'Widgets', type: 'widgetpanel', taskbar: true, default: true, window: {
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
  windowList: [],
  keywordStartApp: ''

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
  windowState: (state) => (id) => {
    const result = state.windowList.find((app) => {
      return app.id === id
    })
    return result.window.show
  },
  cutString20: () => (str) => {
    if (str.length >= 20) {
      str = str.substring(0, 19) + '...'
    }
    return str
  },
  searchAppResult: (state) => () => {
    let searchResult = state.appItemList.filter((appItem) => {
      return appItem.title.trim().toLowerCase().includes(state.keywordStartApp)
    });
    // sort the list
    searchResult = searchResult.sort((a, b) => (a.title > b.title) - (a.title < b.title))
    // add letter to list
    const letter = []
    const letterAdd=(val)=>{
      letter.push({
        icon: 'mdi-alpha-' + val.toLowerCase(), title: val, letter: true
      })
    }
    searchResult.forEach((appResult, index) => {
      const current = appResult.title.trim().toUpperCase().substring(0, 1)

      if (index < searchResult.length - 1) {
        const next = searchResult[index + 1].title.trim().toUpperCase().substring(0, 1)
        if (current !== next) {
          letterAdd(current)
        }
      } else {
        letterAdd(current)
      }
    })
    // concatenating list with letters
    searchResult = searchResult.concat(letter)
    const searchResultWithLetters = searchResult.sort((a, b) => (a.title > b.title) - (a.title < b.title))
    return searchResultWithLetters
  },
  // appListSortedByTitle: (state) => () => {
  //   return state.appItemList.filter.
  // }
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
  SEARCH_APP(state, keyword) {
    state.keywordStartApp = keyword
  }

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
  },
  searchApp({ commit }, keyword) {
    commit('SEARCH_APP', keyword.value.trim().toLowerCase())
  }
}