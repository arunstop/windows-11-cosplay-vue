export const state = () => ({
    desktopOptionList: [],
    desktopIconOptionList: [],

})

export const getters = {
    getDesktopOptionList: (state) => () => {
        return state.desktopOptionList
    },
    getDesktopIconOptionList: (state) => () => {
        return state.desktopIconOptionList
    }
}

export const mutations = {
    INIT_DESKTOP_OPTION_LIST(state, list) {
        state.desktopOptionList = list
    },
    INIT_DESKTOP_ICON_OPTION_LIST(state, list) {
        state.desktopIconOptionList = list
    },
}

export const actions = {
    initDesktopOptionList({ commit }, list) {
        commit('INIT_DESKTOP_OPTION_LIST', list)
    },
    initDesktopIconOptionList({ commit }, list) {
        commit('INIT_DESKTOP_ICON_OPTION_LIST', list)
    },
}