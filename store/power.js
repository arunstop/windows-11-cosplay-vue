export const state = () => ({
    powerItemList: [],
    status: 'LOGGED_OFF',
})

export const mutations = {
    INIT_POWER_LIST(state, list) {
        state.powerItemList = list
    },
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
    initPowerList({ commit }, list) {
        commit('INIT_POWER_LIST', list)
    },
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