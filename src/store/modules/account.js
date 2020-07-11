import firebase from 'firebase/app'

export default {
    state: {
        works: [],
        currentDocument: {}
    },
    actions: {
        async CREATE_DOCUMENT ({commit, state, dispatch}, {title, content, date,author, section}) {
            try {
                const uid = await dispatch('GET_ID')
                const cId = await dispatch('GET_CURRENT_ID')
                let sectionId 

                firebase.firestore().collection('users').doc(`${uid}`)
                        .collection('companies').doc(`${cId}`)
                        .collection('works').doc(`${section}`)
                        .collection('documents')
                        .add({ }).then (docRef => {
                    const docId = docRef.id
                    firebase.firestore().collection('users').doc(`${uid}`)
                        .collection('companies').doc(`${cId}`).collection('works').doc(`${section}`)
                        .collection('documents').doc(`${docId}`).set({
                        title,
                        content,
                        date,
                        id: docId,
                        author,
                        section
                    })
                }).then( async ()=> {
                    sectionId = await dispatch('GET_WORKS_LENGTH')
                }).then(async()=> {
                    
                    const hasSec = await dispatch('HAS_SECTION', section)
                    
                    if (hasSec) {
                        firebase.firestore().collection('users').doc(`${uid}`)
                        .collection('companies').doc(`${cId}`).collection('works').doc(`${section}`)
                        .set({
                            title: section,
                            id: sectionId
                        })
                    }
                }).then(()=> {
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
        async WORKS({dispatch, state, commit}, section){
            const uid = await dispatch('GET_ID')
            const cId = await dispatch('GET_CURRENT_ID')

            commit('CLEAN_WORKS')
            
            firebase.firestore().collection('users').doc(`${uid}`).collection('companies').doc(`${cId}`)
            .collection('works').get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    commit('PUT_WORKS', doc.data())
                })
            })
        },
        async IN_SECTION({dispatch, state, commit}, section){
            const uid = await dispatch('GET_ID')
            const cId = await dispatch('GET_CURRENT_ID')
            
            const documData =  await firebase.firestore().collection('users').doc(`${uid}`).collection('companies').doc(`${cId}`)
            .collection('works').doc(`${section}`).collection('documents')
            .get()
            let arr = []
            documData.forEach(doc => {
                arr.push(doc.data())
            })

            return arr
        },
        async IN_DOCUMENT({dispatch, state, commit}, {documentId, section}){
            const uid = await dispatch('GET_ID')
            const cId = await dispatch('GET_CURRENT_ID')
            //state.works = []
            const currentDoc = await firebase.firestore().collection('users').doc(`${uid}`).collection('companies').doc(`${cId}`).collection('works').doc(`${section}`)
            .collection('documents').doc(`${documentId}`).get()
            
            return currentDoc.data()

           /* if (doc.exists){
                //commit ('PUSH_DOC_OBJECT', doc.data())
                console.log(doc);
            }*/
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