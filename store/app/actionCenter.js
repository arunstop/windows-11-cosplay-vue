export const state = () => ({
    actionList: [],
})

export const mutations = {
    INIT_ACTION_LIST(state, list) {
        state.actionList = list
    },
    PIN_ACTION(state, action) {
        state.actionList.find(alItem => alItem.label === action.label).pinned = true
    },
    UNPIN_ACTION(state, action) {
        state.actionList.find(alItem => alItem.label === action.label).pinned = false
    },

}

export const getters = {
    getPinnedActionList: (state) => () => {
        const pinnedAction = state.actionList.filter(paItem => paItem.pinned === true)
        return pinnedAction
    },
    getUnpinnedActionList: (state) => () => {
        const unpinnedAction = state.actionList.filter(paItem => paItem.pinned === false)
        // console.log(unpinnedAction)
        return unpinnedAction
    }
}

export const actions = {
    initActionList({ commit }, list) {
        commit('INIT_ACTION_LIST', list)
    },
    pinAction({ commit }, action) {
        commit('PIN_ACTION', action)
    },
    unpinAction({ commit }, action) {
        commit('UNPIN_ACTION', action)
    }
}