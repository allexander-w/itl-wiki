import firebase from 'firebase/app'

export default {
    state: {
        currentUserInfo: {}
    },
    mutations: {
        PUT_USER_INFO(state, userData){
            state.currentUserInfo = userData
        }
    },
    actions: {
        async LOGIN({commit, dispatch}, {email, password}){
            try {
                await firebase.auth().signInWithEmailAndPassword(email,password)
            } catch (e) {throw e}
        },
        async REGISTER({dispatch}, {email,password,name,surname,role}) {
            try {
                
                await firebase.auth().createUserWithEmailAndPassword(email,password)
                const uid = await dispatch('GET_ID')
                firebase.firestore().collection('users').doc(`${uid}`)
                        .collection('information').doc('userInfo').set({
                    name,
                    surname,
                    role
                }).then(()=> {
                    firebase.firestore().collection("users").doc(`${uid}`)
                    .set ({
                        currentId: 'null'
                    })
                })

            } catch (e) {throw e}
        },
        async COMPANY_DATA ({dispatch}, {company, domen}) {
            try {
                const uid = await dispatch('GET_ID')
                firebase.firestore().collection('users').doc(`${uid}`)
                        .collection('companies').add({ }).then (docRef => {
                    const docId = docRef.id
                    firebase.firestore().collection('users').doc(`${uid}`)
                        .collection('companies').doc(`${docId}`).set({
                    id: docId,
                    name: company,
                    domen
                    })
                })
            } catch (e) {throw e}
        },
        async FETCH_INFO({state,dispatch, commit}){
            try {
                const uid = await dispatch('GET_ID')
                var docRef = await firebase.firestore().collection("users").doc(`${uid}`).collection('information').doc('userInfo')
                const doc = await docRef.get()
                let userInfo = {}
                if (doc.exists) {
                    userInfo = doc.data()
                    commit('PUT_USER_INFO', userInfo)
                }

                const email = await firebase.auth().currentUser.email
                userInfo.email = email
                commit('PUT_USER_INFO', userInfo)
            } catch (e) {throw e}

        

           /* docRef.get().then(function(doc) {
                if (doc.exists) {
                   commit('PUT_USER_INFO', doc.data())
                }
            })
            .catch(function(error) {
                console.log("Error getting document:", error);
            });*/

           
        },
        GET_ID(){
           const user = firebase.auth().currentUser
           return user ? user.uid : null
        },
        async LOGOUT({dispatch, state}){
            try {
                await firebase.auth().signOut()
                state.company = {}
            } catch (e){throw e}
        }
    },
    getters: {
        GET_CURRENT_USER_INFO(state) {
            return state.currentUserInfo
        }
    }
}