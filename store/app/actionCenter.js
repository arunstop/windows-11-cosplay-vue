export const state = () => ({
    actionList: [
        { label: "Wi-Fi", icon: "mdi-wifi", pinned: true, toggleable:true, },
        { label: "Bluetooth", icon: "mdi-bluetooth", pinned: true, toggleable:true, },
        { label: "Airplane Mode", icon: "mdi-airplane", pinned: true, toggleable:true, },
        { label: "Night Light", icon: "mdi-white-balance-sunny", pinned: true, toggleable:true, },
        { label: "Focus Assist", icon: "mdi-weather-night", pinned: true, toggleable:false, },
        { label: "Accessibility", icon: "mdi-human", pinned: true, toggleable:false, },
        { label: "Connect", icon: "mdi-monitor-cellphone", pinned: false, toggleable:false, },
        { label: "Keyboard Layout", icon: "mdi-translate", pinned: false, toggleable:false, },
        { label: "Mobile Hotspot", icon: "mdi-access-point", pinned: false, toggleable:false, },
        { label: "Nearby Sharing", icon: "mdi-broadcast", pinned: false, toggleable:false, },
        { label: "Project", icon: "mdi-monitor-multiple", pinned: false, toggleable:false, },
    ]
})

export const mutations = {
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
        // console.log(pinnedAction)
        return pinnedAction
    },
    getUnpinnedActionList: (state) => () => {
        const unpinnedAction = state.actionList.filter(paItem => paItem.pinned === false)
        // console.log(unpinnedAction)
        return unpinnedAction
    }
}

export const actions = {
    pinAction({ commit }, action) {
        commit('PIN_ACTION', action)
    },
    unpinAction({ commit }, action) {
        commit('UNPIN_ACTION', action)
    }
}