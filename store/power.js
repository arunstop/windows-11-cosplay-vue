export const state = () => ({
    itemList: [{ icon: 'mdi-lock', label: 'Lock' },
    { icon: 'mdi-logout-variant', label: 'Log Off' },
    { icon: 'mdi-swap-horizontal', label: 'Switch User' },
    { icon: 'mdi-power-sleep', label: 'Sleep' },
    { icon: 'mdi-restart', label: 'Restart' },
    { icon: 'mdi-sleep', label: 'Hibernate' },
    { icon: 'mdi-power', label: 'Shutdown' },]

})

export const mutations = {

    TOGGLE_WINDOW(state, id) {
        // alert(id)
        const result = state.windowList.find((app) => {
            return app.id === id
        })
        result.window.show = !result.window.show
    },
}


export const actions = {
    
    closeApp({ commit, dispatch }, app) {
        // dispatch('toggleWindow', { id: app.id }).then(() => {
        //   commit('CLOSE_APP', app.id)
        // },1000)
        dispatch('toggleWindow', { id: app.id })
        setTimeout(() => {
            commit('CLOSE_APP', app.id)
        }, 100);
    },
}