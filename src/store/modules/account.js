import firebase from 'firebase/app'

export default {
    state: {
        works: []
    },
    actions: {
        async GET_WORKS({dispatch, state, commit}, id){
            const uid = await dispatch('GET_ID')
            let docRef = await firebase.firestore().collection("users").doc(`${uid}`)
                docRef.update ({
                    currentId: id
                })
        },
        async WORKS({dispatch, state, commit}){
            const uid = await dispatch('GET_ID')
            const cId = await dispatch('GET_CURRENT_ID')
            state.works = []
            firebase.firestore().collection('users').doc(`${uid}`).collection('companies').doc(`${cId}`).collection('works').get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log(doc.data());
                    commit('PUT_WORKS', doc.data())
                })
            })
        },
        async GET_CURRENT_ID ({dispatch, commit, state}) {
            const uid = await dispatch('GET_ID')
            let getId = firebase.firestore().collection("users").doc(`${uid}`)
            const doct = await getId.get()

            let idInfo = {}
            if (doct.exists) {
                idInfo = doct.data()
            }

           return idInfo.currentId

        }
    },
    mutations: {
        PUT_WORKS (state, data) {
            state.works.push(data)
            state.needComponent = 'SBHome'
        }
    },
    getters: {
        ALL_WORKS(state) {
            return state.works
        }
    }
}