import { getLogin } from "@/api";

const state = {
    userData:{},

}

const mutations = {
    getUserData(state,userData){
        state.userData = userData
        window.localStorage.setItem('token',userData.token)
        window.localStorage.setItem('name',userData.name)
    }
}

const actions = {
    async getUser({commit},data){
        let res = await getLogin(data)
        console.log(res);
        if(res.code === 0){
            commit('getUserData',res.data)
        }
    }
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}