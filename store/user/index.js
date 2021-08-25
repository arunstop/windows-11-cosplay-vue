export const state = () => ({
    userList: [],
    loggedOnUser: { hiddenNews: [] }
})

export const getters = {
    activatedUser: (state) => {
        const activatedUser = state.userList.find(user => user.active === true)
        // console.log(activatedUser)
        return activatedUser
    }
}

export const mutations = {
    INIT_USER_LIST(state, list) {
        state.userList = list
    },
    ACTIVATE_USER(state, email) {
        const activatedUser = state.userList.find(user => user.active === true)
        activatedUser.active = false
        const target = state.userList.find(user => user.email === email)
        target.active = true
    },
    LOG_ON(state, email) {
        if (this.$localStorage.has('user')) {
            state.loggedOnUser = this.$localStorage.get('user')
            return
        }
        const target = state.userList.find(user => user.email === email)
        target.status = 'LOGGED_ON'
        const userData = { ...target, hiddenNews: [] };
        state.loggedOnUser = userData
        // set local storage user
        this.$localStorage.set('user', userData)
    },
    LOG_OFF(state, email) {
        const target = state.userList.find(user => user.email === email)
        target.status = 'LOGGED_OFF'
        state.loggedOnUser = {}
        this.$localStorage.remove('user')
    },
    HIDE_NEWS(state, url) {
        state.loggedOnUser.hiddenNews.push(url)
        this.$localStorage.set('user', state.loggedOnUser)
    }
}

export const actions = {
    initUserList({ commit }, list) {
        commit('INIT_USER_LIST', list)
    },
    activateUser({ commit }, email) {
        commit('ACTIVATE_USER', email)
    },
    logOn({ commit, dispatch, state }, user) {
        commit('LOG_ON', user.email)
        dispatch('power/powerAction', state.loggedOnUser.status, { root: true })
    },
    logOff({ state, commit, dispatch }, status) {
        commit('LOG_OFF', state.loggedOnUser.email)
        dispatch('power/powerAction', status, { root: true })
    },
    hideNews({ commit }, url) {
        commit('HIDE_NEWS', url)
    }
}