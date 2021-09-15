export const state = () => ({
  windowList: [],
  showDesktop: false,
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
  getNonSnappedWindowList: (state) => () => {
    return state.windowList.filter((app) => {
      return app.window.snap === false && app.type === 'window'
    })
  },
  getSnappedWindowList: (state) => () => {
    return state.windowList.filter((app) => {
      return app.window.snap === true
    })
  },
  getTrayWindowList: (state) => () => {
    return state.windowList.filter(app => app.tray === true)
  },
  isOpened: (state) => (id) => {
    return state.windowList.find((app) => app.id === id)
  },
  isVisible: (state) => (id) => {
    return state.windowList.find((app) => app.id === id)?.window.show || false
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
    if (target.type === 'window' && data.value === true && target.window.snap === false) {
      const latestApp = state.windowList
        .filter((app) => app.window.snap === false && app.type === 'window')
        .sort((a, b) => b.position - a.position)[0]
      // console.log(latestApp)
      if (latestApp.position !== target.position)
        target.position = latestApp.position + 1
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
    app.window.show = true
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
  SNAP_WINDOW(state, id) {
    state.windowList.forEach(element => {
      if (element.window.snap === false) element.window.show = false
    });
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
  },
  HIDE_ALL_NON_SNAPPED_WINDOWS(state) {
    state.windowList.forEach(element => {
      if (element.window.snap === false) element.window.show = false
    });
  },
  TOGGLE_SHOW_DESKTOP(state) {
    state.showDesktop = !state.showDesktop
  }
}

export const actions = {
  openDefaultApps({ commit, rootState }) {
    const defaultApps = rootState.windows.appList.filter((appItem) => appItem.preOpen)
    commit('OPEN_DEFAULT_APPS', defaultApps)
  },
  toggleWindow({ commit, state, dispatch }, data) {
    const target = state.windowList.find((item) => item.id === data.id)
    // console.log(target)
    if (target.window.snap === true) {
      dispatch('windows/snap/removeSnap', target.id, { root: true })
      // dispatch('windows/snap/closeSnapApp', target.id, { root: true })
    }
    commit('TOGGLE_WINDOW', data)
  },
  toggleFullscreen({ commit, dispatch }, app) {
    // console.log(app)
    if (app.window.snap === true) dispatch('windows/snap/removeSnap', app.id, { root: true })
    commit('TOGGLE_FULLSCREEN', app.id)
  },
  openApp({ state, commit, rootGetters, dispatch }, app) {
    const duplicateItem = state.windowList.find((item) => item.id === app.id)
    if (duplicateItem) {
      if (duplicateItem.window.snap) dispatch('toggleShowDesktop')
      commit('TOGGLE_WINDOW', { id: app.id, value: true })
    } else {
      commit('OPEN_APP', app)
      // commit('TOGGLE_WINDOW', { id: app.id, value: true })
      if (rootGetters['windows/snap/isSnapActivated']) {
        const emptySnapSlot = rootGetters['windows/snap/getEmptySnapSlots']
        // open app depends on snap
        const snapInitIndex = rootGetters['windows/snap/getSnapInitIndex']
        const snapIndex = snapInitIndex || emptySnapSlot?.index;
        // console.log(snapIndex)
        if (emptySnapSlot) {
          // commit('TOGGLE_SHOW_DESKTOP')
          if (!state.showDesktop) {
            dispatch('windows/snap/addSnap', {
              type: rootGetters['windows/snap/getSnapType'],
              index: snapIndex,
              app
            }, { root: true })
          }
        }
      }
    }
  },
  openAppById({ dispatch, rootGetters }, id) {
    const targetApp = rootGetters['windows/getAppById'](id)
    dispatch('openApp', targetApp)
  },
  closeApp({ commit, dispatch }, app) {
    // dispatch('toggleWindow', { id: app.id }).then(() => {
    //   commit('CLOSE_APP', app.id)
    // },1000)
    if (app.window.snap === true) dispatch('windows/snap/closeSnapApp', app.id, { root: true })
    else dispatch('toggleWindow', { id: app.id, value: false })
    commit('CLOSE_APP', app.id)

    // setTimeout(() => {
    // }, 100);
  },
  toggleShowDesktop({ commit, dispatch }) {
    // dispatch('windows/snap/removeSnapLayout', '', { root: true })
    commit('HIDE_ALL_NON_SNAPPED_WINDOWS')
    commit('TOGGLE_SHOW_DESKTOP')
  }
}