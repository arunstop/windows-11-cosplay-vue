export const state = () => ({
    actionList: [],
    activeActionList: [],
})

export const mutations = {
    INIT_ACTION_LIST(state, list) {
        state.actionList = list
        state.activeActionList = list.filter(item => item.pinned === true)
    },
    PIN_ACTION(state, action) {
        state.activeActionList.push(state.actionList.find(item => item.label === action.label))

    },
    UNPIN_ACTION(state, action) {
        state.activeActionList= state.activeActionList.filter(item => item!==action)
    },

}

export const getters = {
    getPinnedActionList: (state) => () => {
        return state.activeActionList
    },
    getUnpinnedActionList: (state) => () => {
        const unpinnedAction = state.actionList.filter(paItem => !state.activeActionList.includes(paItem))
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