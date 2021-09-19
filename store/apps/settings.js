export const state = () => ({
    settingsMenuList: [],
    searchSettingsKeyword: '',
})

export const getters = {
    activatedUser: (state) => {
        const activatedUser = state.userList.find(user => user.active === true)
        // console.log(activatedUser)
        return activatedUser
    },
    getSettingsMenuList: (state) => () => {
        const keyword = state.searchSettingsKeyword.trim().toLowerCase()
        const searchResult = state.settingsMenuList.filter(sm => sm.label.trim().toLowerCase().includes(keyword))
        if (searchResult.length === 0) { return [{ notFound: true, label: 'No Settings Found' }] }
        return searchResult
    },
    getActiveSettingsMenu: (state) => {
        return state.settingsMenuList.find(el => el.active)
    }
}

export const mutations = {
    INIT_SETTINGS_MENU_LIST(state, list) {
        // console.log("OK")
        state.settingsMenuList = list
    },
    SEARCH_SETTINGS(state, keyword) {
        // console.log("OK")
        state.searchSettingsKeyword = keyword
    },
    SET_ACTIVE_SETTINGS_MENU(state, label) {
        console.log(label)
        state.settingsMenuList.find(el => el.active).active = false
        state.settingsMenuList.find(el => el.label === label).active = true
    }
}

export const actions = {
    initSettingsMenuList({ commit }, list) {
        commit('INIT_SETTINGS_MENU_LIST', list)
    },
    searchSettings({ commit }, keyword) {
        commit('SEARCH_SETTINGS', keyword)
    },
    setActiveSettingsMenu({ commit }, label) {
        commit('SET_ACTIVE_SETTINGS_MENU', label)
    }
}