export const state = () => ({
  appList: [],
  startAppList: [],
  taskbarAppList: [],
  recentItemList: [],
  taskbarAppOptionList: [],
  searchAppKeyword: ''
})

export const getters = {
  getTaskbarAppList: (state) => () => {
    // console.log(state.snapLayout)
    const isDefault = (titleKebab) => state.taskbarAppList.find(ta => ta === titleKebab)
    const talDefault = state.appList.filter((appItem) => {
      // const opened = state.window.windowList.find((window) => {
      //   return window.id === appItem.id
      // })
      // console.log(opened)
      return isDefault(appItem.titleKebab) && (appItem.type !== 'notificationpanel' && appItem.type !== 'actioncenter')
    })

    const talOpened = state.window.windowList.filter(appItem => !isDefault(appItem.titleKebab) && appItem.type === 'window')

    return [...talDefault, ...talOpened]
  },
  getTaskbarappOptionList: (state) => () => {
    return state.taskbarAppOptionList
  },
  getDesktopAppList: (state) => {
    // console.log(state.appList)
    return state.appList.filter(app => app.desktop === true)
  },
  getPinnedAppList: (state) => () => {
    // return state.appList.filter((appItem) => {
    //   return appItem.start
    // })
    const sal = state.startAppList
    return state.appList
      .filter(appItem => sal.includes(appItem.titleKebab))
      .sort((a, b) => sal.indexOf(a.titleKebab) - sal.indexOf(b.titleKebab))
  },
  searchAppResult: (state) => () => {
    let searchResult = state.appList.filter((appItem) => {
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
  getAppById: (state) => (titleKebab) => {
    return state.appList.find(app => app.titleKebab === titleKebab)
  },
}

export const mutations = {
  INIT_APP_LIST(state, list) {
    state.appList = list
  },
  INIT_START_APP_LIST(state, list) {
    state.startAppList = list
  },
  INIT_TASKBAR_APP_LIST(state, list) {
    state.taskbarAppList = list
  },
  INIT_RECENT_ITEM_LIST(state, list) {
    state.recentItemList = list
  },
  INIT_TASKBAR_APP_OPTION_LIST(state, list) {
    state.taskbarAppOptionList = list
  },
  SEARCH_APP(state, keyword) {
    state.searchAppKeyword = keyword
  },
  PIN_START(state, app) {
    const targetApp = state.appList.find(item => item.titleKebab === app.titleKebab)
    targetApp.start = true
    state.startAppList.push(app.titleKebab)
  },
  UNPIN_START(state, app) {
    const targetApp = state.appList.find(item => item.titleKebab === app.titleKebab)
    targetApp.start = false
    state.startAppList = state.startAppList.filter(sa => sa !== app.titleKebab)
  },
  PIN_TASKBAR(state, app) {
    const targetApp = state.appList.find(item => item.titleKebab === app.titleKebab)
    targetApp.taskbar = true
    state.taskbarAppList.push(app.titleKebab)
  },
  UNPIN_TASKBAR(state, app) {
    const targetApp = state.appList.find(item => item.titleKebab === app.titleKebab)
    targetApp.taskbar = false
    state.taskbarAppList = state.taskbarAppList.filter(ta => ta !== app.titleKebab)
  },
}

export const actions = {
  initAppList({ commit }, list) {
    commit('INIT_APP_LIST', list)
  },
  initStartAppList({ commit }, list) {
    commit('INIT_START_APP_LIST', list)
  },
  initTaskbarAppList({ commit }, list) {
    commit('INIT_TASKBAR_APP_LIST', list)
  },
  initRecentItemList({ commit }, list) {
    commit('INIT_RECENT_ITEM_LIST', list)
  },
  initTaskbarAppOptionList({ commit }, list) {
    commit('INIT_TASKBAR_APP_OPTION_LIST', list)
  },
  searchApp({ commit }, keyword) {
    commit('SEARCH_APP', keyword.value.trim().toLowerCase())
  },
  pinStart({ commit }, app) {
    commit('PIN_START', app)
  },
  unpinStart({ commit }, app) {
    commit('UNPIN_START', app)
  },
  pinTaskbar({ commit }, app) {
    commit('PIN_TASKBAR', app)
  },
  unpinTaskbar({ commit }, app) {
    commit('UNPIN_TASKBAR', app)
  },
}