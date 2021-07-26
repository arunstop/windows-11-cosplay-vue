
export const state = () => {
  const randomId=()=>{
    return Math.floor(Math.random() * 1001)
  }
  // const randomColorHex=()=>{
    // return '#'+Math.floor(Math.random()*16777215).toString(16)
  //   return '#000';
  // }
  const randomColorRgb=()=>{
    const getRandomInt= (min, max) =>{
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
    return `rgba(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)},1)`
  }
  return {
    appItemList: [
      { id: randomId(), icon: 'mdi-microsoft-edge', iconColor: randomColorRgb() ,title: 'Edge' },
      { id: randomId(), icon: 'mdi-microsoft-word', iconColor: randomColorRgb() ,title: 'Word' },
      { id: randomId(), icon: 'mdi-microsoft-powerpoint', iconColor: randomColorRgb() ,title: 'PowerPoint' },
      { id: randomId(), icon: 'mdi-email-outline', iconColor: randomColorRgb() ,title: 'Mail' },
      { id: randomId(), icon: 'mdi-check-circle', iconColor: randomColorRgb() ,title: 'To Do' },
      { id: randomId(), icon: 'mdi-netflix', iconColor: randomColorRgb() ,title: 'Netflix' },
      { id: randomId(), icon: 'mdi-image', iconColor: randomColorRgb() ,title: 'Photos' },
      { id: randomId(), icon: 'mdi-cellphone', iconColor: randomColorRgb() ,title: 'Your Phone' },
      { id: randomId(), icon: 'mdi-scissors-cutting', iconColor: randomColorRgb() ,title: 'Snipping Tool' },
      { id: randomId(), icon: 'mdi-twitter', iconColor: randomColorRgb() ,title: 'Twitter' },
      { id: randomId(), icon: 'mdi-skype', iconColor: randomColorRgb() ,title: 'Skype' },
      { id: randomId(), icon: 'mdi-microsoft-xbox', iconColor: randomColorRgb() ,title: 'Xbox' },
      { id: randomId(), icon: 'mdi-whatsapp', iconColor: randomColorRgb() ,title: 'WhatsApp' },
      { id: randomId(), icon: 'mdi-microsoft-excel', iconColor: randomColorRgb() ,title: 'Excel' },
      { id: randomId(), icon: 'mdi-spotify', iconColor: randomColorRgb() ,title: 'Spotify' },
      { id: randomId(), icon: 'mdi-microsoft-visual-studio-code', iconColor: randomColorRgb() ,title: 'VS Code' },
      { id: randomId(), icon: 'mdi-github', iconColor: randomColorRgb() ,title: 'Github' },
      { id: randomId(), icon: 'mdi-discord', iconColor: randomColorRgb() ,title: 'Discord' },
      {
        id: randomId(), icon: 'mdi-microsoft-windows', iconColor: randomColorRgb() ,title: 'My Computer', type: 'startmenu', taskbar: true, default: true, window: {
          show: false,
          fullscreen: false,
        },
      },
      {
        id: randomId(), icon: 'mdi-magnify', iconColor: randomColorRgb() ,title: 'Search', type: 'searchpanel', taskbar: true, default: true, window: {
          show: false,
          fullscreen: false,
        },
      },
      {
        id: randomId(), icon: 'mdi-view-dashboard', iconColor: randomColorRgb() ,title: 'Widgets', type: 'widgetpanel', taskbar: true, default: true, window: {
          show: false,
          fullscreen: false,
        },
      },
      {
        id: randomId(), icon: 'mdi-folder', iconColor: randomColorRgb() ,title: 'File Explorer', type: 'window', taskbar: true, window: {
          show: false,
          fullscreen: false,
        },
      },
      {
        id: randomId(), icon: 'mdi-microsoft-edge', iconColor: randomColorRgb() ,title: 'Microsoft Edge', type: 'window', taskbar: true, window: {
          show: false,
          fullscreen: false,
        },
      },
      {
        id: randomId(), icon: 'mdi-cart', iconColor: randomColorRgb() ,title: 'Microsoft Store', type: 'window', taskbar: true, window: {
          show: false,
          fullscreen: false,
        },
      },
    ],
    recentItemList: [
      { icon: 'mdi-buffer', iconColor: randomColorRgb() ,title: 'WinRAR', lastOpened: 'Recently added' },
      { icon: 'mdi-steam', iconColor: randomColorRgb() ,title: 'Steam', lastOpened: 'Yesterday' },
      {
        icon: 'mdi-microsoft-powerpoint',
        iconColor: randomColorRgb() ,title: 'Monthly Presentation.pptx',
        lastOpened: '3 days ago',
      },
      { icon: 'mdi-movie-play', iconColor: randomColorRgb() ,title: 'Beach.mp4', lastOpened: 'Jul 17' },
      {
        icon: 'mdi-music-circle',
        iconColor: randomColorRgb() ,title: 'Coldplay - Every Teardrop Is a Waterfall.mp3',
        lastOpened: 'Jun 6',
      },
      { icon: 'mdi-image', iconColor: randomColorRgb() ,title: 'Sea.png', lastOpened: 'Jun 1' },
    ],
    windowList: [],
    searchAppKeyword: ''
  
  }
}

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
      return appItem.title.trim().toLowerCase().includes(state.searchAppKeyword)
    });
    // if no items found
    if (searchResult.length === 0) { return [{ notFound: true,title: 'No Items Found' }] }
    // sort the list
    searchResult = searchResult.sort((a, b) => (a.title > b.title) - (a.title < b.title))
    // add letters to list
    const letter = []
    const letterAdd = (val) => {
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
    state.searchAppKeyword = keyword
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