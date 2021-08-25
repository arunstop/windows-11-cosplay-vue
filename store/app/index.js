export const state = {
  appItemList: [],
  recentItemList: [],
  searchAppKeyword: ''
}

export const getters = {
  taskbarApps: (state) => {
    // console.log(state.snapLayout)
    return state.appItemList.filter((appItem) => {
      const opened = state.window.windowList.find((window) => {
        return window.id === appItem.id
      })
      // console.log(opened)
      return appItem.taskbar || (opened && appItem.type !== 'notificationpanel' && appItem.type !== 'actioncenter')
    })
  },
  getDesktopAppList: (state) => {
    // console.log(state.appItemList)
    return state.appItemList.filter(app => app.desktop === true)
  },
  getPinnedApps: (state) => () => {
    return state.appItemList.filter((appItem) => {
      return !appItem.taskbar && appItem.type === 'window'
    })
  },
  searchAppResult: (state) => () => {

    let searchResult = state.appItemList.filter((appItem) => {
      return appItem.title.trim().toLowerCase().includes(state.searchAppKeyword)
    });
    // if no items found
    if (searchResult.length === 0) { return [{ notFound: true, title: 'No Items Found' }] }
    // sort the list
    searchResult = searchResult.sort((a, b) => (a.title > b.title) - (a.title < b.title))
    // add letters to list
    const letter = []
    const letterAdd = (val) => {
      letter.push({
        icon: 'mdi-alpha-' + val.toLowerCase(), title: val, letter: true
      })
    }
    // add each letter to list
    searchResult.forEach((appResult, index) => {
      const current = appResult.title.trim().toUpperCase().substring(0, 1)
      // get letter from the first letter from app name
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
    // sort the list
    const searchResultWithLetters = searchResult.sort((a, b) => (a.title > b.title) - (a.title < b.title))
    return searchResultWithLetters
  },
}

export const mutations = {
  INIT_APP_LIST(state, list) {
    state.appItemList = list
  },
  INIT_RECENT_ITEM_LIST(state, list) {
    state.recentItemList = list
  },
  SEARCH_APP(state, keyword) {
    state.searchAppKeyword = keyword
  }
}

export const actions = {
  initAppList({ commit }, list) {
    commit('INIT_APP_LIST', list)
  },
  initRecentItemList({ commit }, list) {
    commit('INIT_RECENT_ITEM_LIST', list)
  },
  searchApp({ commit }, keyword) {
    commit('SEARCH_APP', keyword.value.trim().toLowerCase())
  }
}