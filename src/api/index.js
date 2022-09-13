import { request } from "./request.js";

export function getLogin(data){
    return request({
        url:'/api/login',
        method:'post',
        data:data
    })
}

export function getMenu(){
    return request({
        url:"/api/role/1/menu",
        method:'get'
    })
}

export function getList(url){
    return request({
        url:`/api/${url}`,
        method:'get'
    })
}

export function getContentList(url,data){
    return request({
        url:`/api/${url}/list`,
        method:'post',
        data:data
    })
}