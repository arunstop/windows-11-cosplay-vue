// import news from '@/static/news.json'

export const state = () => ({
    topStories: [], newsList: []
})

export const mutations = {
    GET_NEWS_LIST(state, payload) {

    },
    ADD_TOP_STORY(state, topStory) {
        state.topStories.push(topStory)
    },
    ADD_NEWS(state, news) {
        state.newsList.push(news)
    },
    REMOVE_NEWS(state, url) {
        // console.log(state.newsList.news)
        state.newsList = state.newsList.filter(news => news.url !== url)
    }
}

export const getters = {
    getUnhiddenNewsList: (state, getters,rootState) => () => {
        // const unhiddenNews = state.newsList.filter(news => !rootState.user.loggedOnUser.hiddenNews.includes(news.url))
        // console.log(unhiddenNews)
        return state.newsList.filter(news => !rootState.user.loggedOnUser.hiddenNews.includes(news.url))
    }
}

export const actions = {
    getNewsList({ commit }, payload) {
        this.$apiNews.showTrending().then((response) => {
            response.data.value.forEach((element, index) => {
                // filling up no-image articles
                Object.assign(element, { _key: this.$globals.generateKey() })
                element.image = element.image || {
                    thumbnail: {
                        contentUrl: '',
                    },
                }
                // filling up no-image providers
                element.provider[0].image = element.provider[0].image || {
                    thumbnail: {
                        contentUrl: '',
                    },
                }
                if (index > 1 && index % 5 === 0 && element.image.thumbnail.contentUrl) {
                    Object.assign(element, { spanned: true })
                }

                // console.log(element.image)
                if (index < 4) {
                    commit('ADD_TOP_STORY', element)
                } else {
                    commit('ADD_NEWS', element)
                }
            });
        })

        // require('@/static/news.json').value.forEach((element, index) => {
        //     // filling up no-image articles
        //     element.image = element.image || {
        //         thumbnail: {
        //             contentUrl: '',
        //         },
        //     }
        //     // filling up no-image providers
        //     element.provider[0].image = element.provider[0].image || {
        //         thumbnail: {
        //             contentUrl: '',
        //         },
        //     }
        //     if (index > 1 && index % 5 === 0 && element.image.thumbnail.contentUrl) {
        //         Object.assign(element, { spanned: true })
        //     }

        //     // console.log(element.image)
        //     if (index < 4) {
        //         commit('ADD_TOP_STORY', element)
        //     } else {
        //         commit('ADD_NEWS', element)
        //     }
        // })

    },
    removeNews({ commit }, url) {
        commit('REMOVE_NEWS', url)
    }
}