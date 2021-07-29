export const state = () => ({
  windowList: [],
})

export const getters = {
  windowState: (state) => (id) => {
    const result = state.windowList.find((app) => {
      return app.id === id
    })
    return result.window.show
  },
}

export const mutations = {
  OPEN_DEFAULT_APPS(state, defaultApps) {
    state.windowList = defaultApps
    // console.log(state.windowList)
  },
  TOGGLE_WINDOW(state, data) {
    const result = state.windowList.find((app) => {
      return app.id === data.id
    })
    result.window.show = data.value
  },
  TOGGLE_FULLSCREEN(state, id) {
    const result = state.windowList.find((app) => {
      return app.id === id
    })
    result.window.fullscreen = !result.window.fullscreen
  },
  OPEN_APP(state, app) {
    state.windowList.push(app)
  },
  CLOSE_APP(state, id) {
    // const result = state.windowList.find((app) => {
    //   return app.id === id
    // })
    // result.window.fullscreen = false
    // Remove items from array

    state.windowList = state.windowList.filter(item => item.id !== id)
  },
  IS_OPENED_APP(state, id) {
    const result = state.windowList.find((app) => {
      return app.id === id
    })
    return result
  },
}

export const actions = {
  openDefaultApps({ commit, rootState }) {
    const defaultApps = rootState.app.appItemList.filter((appItem) => appItem.default)
    commit('OPEN_DEFAULT_APPS', defaultApps)
  },
  toggleWindow({ commit }, data) {
    commit('TOGGLE_WINDOW', data)
  },
  toggleFullscreen({ commit }, payload) {
    commit('TOGGLE_FULLSCREEN', payload.id)
  },
  openApp({ state, commit }, app) {
    const duplicateItem = state.windowList.find((item) => item.id === app.id)
    if (duplicateItem) {
      commit('TOGGLE_WINDOW', { id: app.id, value: true })
    } else {
      commit('OPEN_APP', app)
      commit('TOGGLE_WINDOW', { id: app.id, value: true })
    }
  },
  closeApp({ commit, dispatch }, app) {
    // dispatch('toggleWindow', { id: app.id }).then(() => {
    //   commit('CLOSE_APP', app.id)
    // },1000)
    dispatch('toggleWindow', { id: app.id, value: false })
    setTimeout(() => {
      commit('CLOSE_APP', app.id)
    }, 100);
  },
  isAppOpened({ commit }, id) {
    commit('IS_OPENED_APP', id)
  },
}