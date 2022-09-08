import axios from 'axios'

export function request(config){
    const instance = axios.create({
        baseUrl:'http://152.136.185.210:5000/',
        timeout:10000,
    })

    instance.interceptors.request.use(config =>{
        if(window.localStorage.getItem('token')){
            config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`
        }
		return config
	},err=>{
		return Promise.reject(new Error(err))
	})
	
	instance.interceptors.response.use(res =>{
		return res.data
	},err=>{
		return Promise.reject(new Error(err))
	})
    return instance(config)
}