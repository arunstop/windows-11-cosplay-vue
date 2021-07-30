export const state = () => ({
  windowList: [],
})

export const getters = {
  windowState: (state, getters, rootState) => (id) => {
    const result = state.windowList.find((app) => {
      return app.id === id
    })
    // if(!result) return false
    return result.window.show
  },
  NonSnappedWindowList: (state) => () => {
    return state.windowList.filter((app) => {
      return app.window.snap === false && app.type === 'window'
    })
  },
  snappedWindowList: (state) => () => {
    return state.windowList.filter((app) => {
      return app.window.snap === true
    })
  }
}

export const mutations = {
  OPEN_DEFAULT_APPS(state, defaultApps) {
    state.windowList = defaultApps
    // console.log(state.windowList)
  },
  TOGGLE_WINDOW(state, data) {
    const target = state.windowList.find((app) => {
      return app.id === data.id
    })
    target.window.show = data.value
  },
  TOGGLE_FULLSCREEN(state, id) {
    const target = state.windowList.find((app) => {
      return app.id === id
    })

    target.window.fullscreen = !target.window.fullscreen
  },
  OPEN_APP(state, app) {
    state.windowList.push(app)
  },
  CLOSE_APP(state, id) {
    const target = state.windowList.find((app) => {
      return app.id === id
    })
    if (target.window.snap === true) target.window.fullscreen = false
    target.window.snap = false
    // Remove items from array
    state.windowList = state.windowList.filter(item => item.id !== id)
  },
  IS_OPENED_APP(state, id) {
    const target = state.windowList.find((app) => {
      return app.id === id
    })
    return target
  },
  SNAP_WINDOW(state, id) {
    const target = state.windowList.find((app) => {
      return app.id === id
    })
    target.window.fullscreen = false
    target.window.snap = true
  },
  UNSNAP_WINDOW(state, id) {
    const target = state.windowList.find((app) => {
      return app.id === id
    })
    target.window.snap = false
  }
}

export const actions = {
  openDefaultApps({ commit, rootState }) {
    const defaultApps = rootState.app.appItemList.filter((appItem) => appItem.default)
    commit('OPEN_DEFAULT_APPS', defaultApps)
  },
  toggleWindow({ commit }, data) {
    commit('TOGGLE_WINDOW', data)
  },
  toggleFullscreen({ commit, dispatch }, payload) {
    dispatch('app/snap/removeSnap', payload.id, { root: true })
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
    if (app.window.snap === true) dispatch('app/snap/closeSnapApp', app.id, { root: true })
    dispatch('toggleWindow', { id: app.id, value: false })
    setTimeout(() => {
      commit('CLOSE_APP', app.id)
    }, 100);
  },
  isAppOpened({ commit }, id) {
    commit('IS_OPENED_APP', id)
  },
}