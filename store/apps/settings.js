export const state = () => ({
    settingsMenuList: [],
})

export const getters = {
    activatedUser: (state) => {
        const activatedUser = state.userList.find(user => user.active === true)
        // console.log(activatedUser)
        return activatedUser
    },
    getSettingsMenuList:(state)=>()=> {
        return state.settingsMenuList
    }
}

export const mutations = {
    INIT_SETTINGS_MENU_LIST(state, list) {
        console.log("OK")
        state.settingsMenuList = list
    },
}

export const actions = {
    initSettingsMenuList({ commit }, list) {
        commit('INIT_SETTINGS_MENU_LIST', list)
    },
}