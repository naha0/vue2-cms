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

// 获取部门数据
export function getDepartmentData(){
    return request({
        url:'/api/department/list',
        method:'post'
    })
}

// 获取角色数据
export function getRoleData(){
    return request({
        url:'/api/role/list',
        method:'post'
    })
}

// 创建数据
export function createD(urlName,data){
    return request({
        url:`/api/${urlName}`,
        method:'post',
        data:data
    })
}


// 更新数据
export function updateD(urlAndId,data){
    return request({
        url:`/api/${urlAndId}`,
        method:'patch',
        data:data
    })
}

// 删除数据
export function delD(urlName,id){
    return request({
        url:`/api/${urlName}/${id}`,
        method:'delete'
    })
}