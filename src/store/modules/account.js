import firebase from 'firebase/app'

export default {
    state: {
        works: [],
        currentDocument: {}
    },
    actions: {
        async CREATE_DOCUMENT ({commit, state, dispatch}, {title, content, date,author}) {
            try {
                const uid = await dispatch('GET_ID')
                const cId = await dispatch('GET_CURRENT_ID')

                firebase.firestore().collection('users').doc(`${uid}`)
                        .collection('companies').doc(`${cId}`).collection('works').add({ }).then (docRef => {
                    const docId = docRef.id
                    firebase.firestore().collection('users').doc(`${uid}`)
                        .collection('companies').doc(`${cId}`).collection('works').doc(`${docId}`).set({
                        title,
                        content,
                        date,
                        id: docId,
                        author
                    })
                }). then(()=> {
                    dispatch('WORKS')
                })
            } catch (e) {throw e}



        },
        async GET_WORKS({dispatch, state, commit}, id){
            const uid = await dispatch('GET_ID')
            let docRef = await firebase.firestore().collection("users").doc(`${uid}`)
                docRef.update ({
                    currentId: id
                })

            dispatch('FETCH_STATE_OF_CURRENT_COMID')
        },
        async WORKS({dispatch, state, commit}){
            const uid = await dispatch('GET_ID')
            const cId = await dispatch('GET_CURRENT_ID')
            
            commit ('CLEAN_WORKS')
            firebase.firestore().collection('users').doc(`${uid}`).collection('companies').doc(`${cId}`).collection('works').get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    commit('PUT_WORKS', doc.data())
                })
            })
        },
        async IN_DOCUMENT({dispatch, state, commit}, docId){
            const uid = await dispatch('GET_ID')
            const cId = await dispatch('GET_CURRENT_ID')
            state.works = []
            const currentDoc = firebase.firestore().collection('users').doc(`${uid}`).collection('companies').doc(`${cId}`).collection('works').doc(`${docId}`)
            const doc = await currentDoc.get()

            if (doc.exists){
                commit ('PUSH_DOC_OBJECT', doc.data())
            }
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
        },
        PUSH_DOC_OBJECT (state, data){
            state.currentDocument = data
        },
        CLEAN_WORKS (state){
            state.works = []
        }
    },
    getters: {
        ALL_WORKS(state) {
            return state.works.reverse()
        },
        CURRENT_DOCUMENT (state){
            return state.currentDocument
        }
    }
}