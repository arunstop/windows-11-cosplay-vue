export const state = () => ({
    desktopOptionList: [],

})

export const getters = {
    getDesktopOptionList: (state) => () => {
        return state.desktopOptionList
    }
}

export const mutations = {
    INIT_DESKTOP_OPTION_LIST(state, list) {
        state.desktopOptionList = list
    },
}

export const actions = {
    initDesktopOptionList({ commit }, list) {
        commit('INIT_DESKTOP_OPTION_LIST', list)
    },
}