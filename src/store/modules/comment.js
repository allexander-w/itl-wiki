import firebase from 'firebase/app'

export default {
    state: {
        comments: []
    },
    mutations: {
        COMS(state,data){
            state.comments.unshift(data)
        },
        CLEAR_COMS(state) {
            state.comments = []
        }
    },
    getters: {
        comments(state) {
            return state.comments
        }
    },
    actions: {
        async ADD_COMMENT ({dispatch, state, commit}, {initials, date, author, content, documentId, section}) {
            
           const uid = await dispatch('GET_ID')
           const cId = await dispatch('GET_CURRENT_ID')
           let docId
           firebase.firestore().collection('users').doc(`${uid}`)
                   .collection('companies').doc(`${cId}`).collection('works').doc(`${section}`)
                   .collection('documents').doc(`${documentId}`).collection('comments')
                   .add({ }).then (docRef => {
               docId = docRef.id
               firebase.firestore().collection('users').doc(`${uid}`)
                   .collection('companies').doc(`${cId}`).collection('works')
                   .doc(`${section}`)
                   .collection('documents').doc(`${documentId}`)
                   .collection('comments').doc(`${docId}`).set({
                        initials,
                        id: docId,
                        date, 
                        author, 
                        content
                    })
                }).then(()=> {
                    const dataForGet = {
                        documentId,
                        section
                    }
                    dispatch('GET_COMMENTS', dataForGet)
                })
        },
        async GET_COMMENTS({dispatch,commit,state}, {documentId,section}) {
            const uid = await dispatch('GET_ID')
            const cId = await dispatch('GET_CURRENT_ID')

            commit('CLEAR_COMS')
            firebase.firestore().collection('users').doc(`${uid}`)
            .collection('companies').doc(`${cId}`)
            .collection('works').doc(`${section}`)
            .collection('documents').doc(`${documentId}`)
            .collection('comments')
            .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    commit('COMS', doc.data())
                })
            })
        },
        async DELETE_COMMENT({dispatch,commit,state}, {idDocument, idComment, section}){
            const uid = await dispatch('GET_ID')
            const cId = await dispatch('GET_CURRENT_ID')

            commit('CLEAR_COMS')
            firebase.firestore().collection('users').doc(`${uid}`)
            .collection('companies').doc(`${cId}`)
            .collection('works').doc(`${section}`)
            .collection('documents').doc(`${idDocument}`)
            .collection('comments').doc(`${idComment}`)
            .delete().then(()=> {

                const dataForGet = {
                        documentId: idDocument,
                        section
                    }
                dispatch('GET_COMMENTS', dataForGet)
            })
        }
    }
        
}