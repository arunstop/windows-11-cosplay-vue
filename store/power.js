export const state = () => ({
    powerItemList: [
        { icon: 'mdi-lock', label: 'Lock', status: 'LOGGED_OFF' },
        { icon: 'mdi-logout-variant', label: 'Log Off', status: 'LOGGING_OFF' },
        { icon: 'mdi-swap-horizontal', label: 'Switch User', status: 'LOGGED_OFF' },
        { icon: 'mdi-power-sleep', label: 'Sleep', status: 'LOGGED_OFF' },
        { icon: 'mdi-sleep', label: 'Hibernate', status: 'RESTARTING' },
        { icon: 'mdi-restart', label: 'Restart', status: 'RESTARTING' },
        { icon: 'mdi-power', label: 'Shutdown', status: 'TURNING_OFF' },
        // { icon: 'mdi-key', label: 'Logged in', status: 'LOGGED_ON' },
    ],
    status: 'LOGGED_OFF',
})

export const mutations = {
    POWER_WINDOW(state, status) {
        // alert(state.powerItemList)
        // if (status === 'RESTARTING') {
        state.status = status
        // }
        // else if (status === 'LOGGED_ON') {
        // state.status = 'LOGGED_ON'
        // }
    },
}


export const actions = {
    powerAction({ commit,dispatch }, status) {
        commit('POWER_WINDOW', status)

        if (status === 'RESTARTING' || status === 'TURNING_OFF' || status === 'LOGGING_OFF') {
            setTimeout(() => {
                // dispatch('power/logOff', status)
                commit('POWER_WINDOW', 'LOGGED_OFF')
            }, 4200)
        }
    },
}