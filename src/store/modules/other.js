import firebase from 'firebase/app'
export default {
    state: {
        needComponent: 'SBHome',
        companies: [],
        status: ''
    },
    mutations: {
        CHANGE_COMPONENT(state, data) {
            state.needComponent = data
        },
        UPDATE_STATUS (state, status) {
            state.status = status
        }
    },
    getters: {
        GET_COMPONENT(state) {
            return state.needComponent
        },
        COMPANY_INFO(state){
            return state.companies
        },
        STATUS(state) {
            return state.status
        }
    },
    actions: {
        async UPDATE_INFO({dispatch, commit}, {name, surname, email}){
            try {
                const uid = await dispatch('GET_ID')
                let docRef = await firebase.firestore().collection("users").doc(`${uid}`).collection('information').doc('userInfo')
                docRef.update ({
                    name,
                    surname
                })
                // CHANGE!
               /* await firebase.database().ref(`users/${uid}/information`).update({
                    name,
                    surname
               })*/
               // CHANGE!
                const user = await firebase.auth().currentUser
                user.updateEmail(email)

            } catch (e){throw e}
        },
        async ADD_COMPANY ({state,dispatch,commit}){
                const uid = await dispatch('GET_ID')
                state.companies = []
                firebase.firestore().collection('users').doc(`${uid}`).collection('companies').get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        state.companies.push(doc.data())
                        console.log(doc.id);
                    })
                })
        },
        async FETCH_STATE_OF_CURRENT_COMID({dispatch, commit}){
            const uid = await dispatch('GET_ID')
                var docRef = await firebase.firestore().collection("users").doc(`${uid}`)
                const doc = await docRef.get()
                if (doc.exists) {
                    commit ('UPDATE_STATUS',doc.data().currentId) 
                }
        }
    }
}