import axios from 'axios'

const API_KEY = '9d38c929'

export default {
    namespaced: true,
    state: () => ({
        title: '',
        movies: [],
        loading: false
    }),
    mutations: {
        updateState(state, payload) {
            Object
                .keys(payload)
                .forEach(key => {
                    state[key] = payload[key]
                })
        },
        pushIntoMovies(state, movies) {
            state.movies.push(...movies)
        }
    },
    actions: {
        // fetchMovies({ state, commit }, pageNum) {
        //     const promise = new Promise(async resolve => {
        //         const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${state.title}&page=${pageNum}`)
        //         commit('pushIntoMovies', res.data.Search)
        //         resolve(res.data)
        //     })
        //     return promise.then(res => res.data)
        // },
        async searchMovies({ state, commit, }) {
            commit('updateState', {
                loading: true,
                movies: []
            })

            const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${state.title}&page=1`)
            const pageLength = Math.ceil(res.data.totalResults / 10)

            if (pageLength > 1) {
                for (let i = 2; i <= pageLength; i += 1) {
                    if (i > 4) break
                    const resMore = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${state.title}&page=${i}`)
                    commit('pushIntoMovies', resMore.data.Search)
                }
            }

            commit('updateState', {
                loading: false
            })
        }
    }
}