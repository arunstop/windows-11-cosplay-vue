export const state = () => ({
    settingsMenuList: require('@/assets/json/apps/appSettingsMenuList.json'),
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
        return state.settingsMenuList.map(el => el.active).indexOf(true)
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
    SET_ACTIVE_MENU(state, index) {
        state.settingsMenuList.find(el => el.active).active = false
        state.settingsMenuList[index].active = true
    }
}

export const actions = {
    initSettingsMenuList({ commit }, list) {
        commit('INIT_SETTINGS_MENU_LIST', list)
    },
    searchSettings({ commit }, keyword) {
        commit('SEARCH_SETTINGS', keyword)
    },
    setActiveMenu({ commit }, index) {
        commit('SET_ACTIVE_MENU', index)
    }
}