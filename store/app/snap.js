export const state = () => ({
    snapLayout: { type: '', appList: [] }
})

export const getters = {

}

export const mutations = {
    ADD_TO_SNAP(state, item){
state.snapLayout.type = item.type
state.snapLayout.appList.push(item.app)
    }
}

export const actions = {
    addToSnap(commit, item) {
        commit('ADD_TO_SNAP', item)
    }
}