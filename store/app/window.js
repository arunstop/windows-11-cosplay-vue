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
  sortedWindowList: (state) => () => {
    return state.windowList
      .filter((app) => app.window.snap === false)
      .sort((a, b) => a.position - b.position)
  },
  nonSnappedWindowList: (state) => () => {
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
    if (target.position && data.value===true) {
      target.position = state.windowList[state.windowList.length - 1].position + 1
      // console.log(target.position)
    }

  },
  TOGGLE_FULLSCREEN(state, id) {
    const target = state.windowList.find((app) => {
      return app.id === id
    })

    target.window.fullscreen = !target.window.fullscreen
  },
  OPEN_APP(state, app) {
    // alert(this.$moment().format())
    const position = state.windowList[state.windowList.length - 1].position + 1 || state.windowList.length + 1;
    // console.log(position)
    state.windowList.push({ ...app, position })
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
    target.window.show = true
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
  toggleWindow({ commit, state, dispatch }, data) {
    const target = state.windowList.find((item) => item.id === data.id)
    // console.log(target)
    if (target.window.snap === true) {
      dispatch('app/snap/removeSnap', target.id, { root: true })
      // dispatch('app/snap/closeSnapApp', target.id, { root: true })
    }
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
    else dispatch('toggleWindow', { id: app.id, value: false })
    commit('CLOSE_APP', app.id)

    // setTimeout(() => {
    // }, 100);
  },
  isAppOpened({ commit }, id) {
    commit('IS_OPENED_APP', id)
  },
}