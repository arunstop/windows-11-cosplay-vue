export const state = () => ({
    userList: [
        {
            name: 'Daniel Force Forthmay', email: 'user1@outlook.com', pin: '123123',
            image: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', status: 'LOGGED_OFF', active: true
        },
        {
            name: 'Javier de la Pepega', email: 'user2@outlook.com', pin: '123123',
            image: 'https://cdn.vuetifyjs.com/images/lists/2.jpg', status: 'LOGGED_OFF', active: false
        },
        {
            name: 'Camille Mariam Hotpokket', email: 'user3@outlook.com', pin: '123123',
            image: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', status: 'LOGGED_OFF', active: false
        },
        {
            name: 'Karen K Karen', email: 'user4@outlook.com', pin: '123123',
            image: 'https://cdn.vuetifyjs.com/images/lists/4.jpg', status: 'LOGGED_OFF', active: false
        },
    ],
    loggedOnUser: {}
})

export const mutations = {
    ACTIVATE_USER(state, email) {
        const activatedUser = state.userList.find(user => user.active === true)
        activatedUser.active = false
        const target = state.userList.find(user => user.email === email)
        target.active = true
    },
    LOG_ON(state, email) {
        const target = state.userList.find(user => user.email === email)
        target.status = 'LOGGED_ON'
        state.loggedOnUser = target
        // set local storage user
        this.$localStorage.set('user', target)
    },
    LOG_OFF(state, email) {
        const target = state.userList.find(user => user.email === email)
        target.status = 'LOGGED_OFF'
        state.loggedOnUser={}
        this.$localStorage.remove('user')
    },
}

export const getters = {
    activatedUser: (state) => {
        const activatedUser = state.userList.find(user => user.active === true)
        // console.log(activatedUser)
        return activatedUser
    }
}

export const actions = {
    activateUser({ commit }, email) {
        commit('ACTIVATE_USER', email)
    },
    logOn({ commit, dispatch, state }, user) {
        commit('LOG_ON', user.email)
        dispatch('power/powerAction', state.loggedOnUser.status, { root: true })
    },
    logOff({ state,commit,dispatch }, status) {
        commit('LOG_OFF', state.loggedOnUser.email)
        dispatch('power/powerAction', status, { root: true })
    }
}