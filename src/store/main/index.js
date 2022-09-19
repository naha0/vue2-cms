import {
  getLogin,
  getList,
  getMenu,
  getContentList,
  getDepartmentData,
  getRoleData,
  createD,
  updateD,
  delD,
  getMenuData,
} from "@/api";
import { flatRoutes } from "@/router/guards/permission";


const state = {
  userData: {},
  menuData: [],
  urlName: "",
  listData: [],
  usersList: [],
  usersCount: 0,
  roleList: [],
  roleCount: 0,
  departmentList: [],
  departmentCount: 0,
  menuList: [],
  currentRoute: "",
  allRoute: [],
  comData: "",
  searchQuery: {},
  editId:0,
  goodsList:[],
  goodsCount:0
};

const mutations = {
  getUserData(state, userData) {
    state.userData = userData;
    window.localStorage.setItem("token", userData.token);
    window.localStorage.setItem("name", userData.name);
  },
  getMenuData(state, menuData) {
    state.menuData = menuData;
  },
  getUrlName(state, urlName) {
    state.urlName = urlName;
  },
  gerListData(state, listData) {
    state.listData = listData;
    console.log(listData);
  },
  getCurrentRoute(state, currentRoute) {
    state.currentRoute = currentRoute;
  },
  GetAllRoute(state, allRoute) {
    state.allRoute = allRoute;
  },
  getRouteCom(state, comData) {
    state.comData = comData;
  },
  changeUsersList(state, userList) {
    state.usersList = userList;
  },
  changeUsersCount(state, usersCount) {
    state.usersCount = usersCount;
    console.log(usersCount);
  },
  changeRoleList(state, roleList) {
    state.roleList = roleList;
  },
  changeRoleCount(state, roleCount) {
    state.roleCount = roleCount;
  },
  changeDepartmentList(state, departmentList) {
    state.departmentList = departmentList;
  },
  changeDepartmentCount(state, departmentCount) {
    state.departmentCount = departmentCount;
  },
  changeMenuList(state, menuList) {
    state.menuList = menuList;
  },
  getSearchQuery(state, searchQuery) {
    console.log(searchQuery);
    state.searchQuery = searchQuery;
  },
  EditId(state,editId){
    state.editId = editId
  },
  changeGoodsList(state,goodsList){
    state.goodsList = goodsList
  },
  changeGoodsCount(state,goodsCount){
    state.goodsCount = goodsCount
  }
};

const actions = {
  async getUser({ commit }, data) {
    let res = await getLogin(data);
    console.log(res);
    if (res.code === 0) {
      commit("getUserData", res.data);
    }
  },
  async getAllRoute({ commit }) {
    
    window.localStorage.setItem('storageAside', '1')
    let res = await getMenu();
    let routes = flatRoutes(res.data);
    let newRoutes = {};
    console.log("routes111", routes);

    routes = routes.reduce((total, cur) => {
      console.log(total);
      newRoutes[cur.name]
        ? ""
        : (newRoutes[cur.name] = true && total.push(cur));
      return total;
    }, []);
    console.log(routes);
    
    console.log(res, "menu");
    console.log(routes, "vuexRoutes");
    return routes;
  },
  async contentListData({ commit }, payload) {
    console.log(payload);
    let res = await getContentList(payload.pageName, payload.queryInfo);
    console.log(res);
    console.log(res.data);
    const { list, totalCount } = res.data;
    console.log(list, totalCount);
    const contentName =
      payload.pageName?.slice(0, 1).toUpperCase() + payload.pageName.slice(1);
    commit(`change${contentName}List`, list);
    commit(`change${contentName}Count`, totalCount);
    commit("getUrlName", payload.pageName);
  },
  async initData({commit}){
    let res = await getDepartmentData()
    console.log(res);   
    commit('changeDepartmentList',res.data.list)
    commit('changeDepartmentCount',res.data.totalCount)
    let res1 = await getRoleData()
    console.log('changeRoleList',res1.data.list);
    commit('changeRoleList',res1.data.list)
    commit('changeRoleCount',res1.data.totalCount)
    let res2 = await getMenuData()
    commit('changeMenuList',res2.data.list)
  },
  async createData({dispatch},pageData){
    console.log(pageData);
    let res = await createD(pageData.urlName,pageData.newData)
    console.log(res);
    dispatch('contentListData',{
      pageName:pageData.urlName,
      queryInfo:{
        offset:0,
        size:100
      }
    })
  },
  async updateData({dispatch},pageData){
    let res= await updateD(pageData.urlName,pageData.editData)
    console.log(pageData);
    console.log(res);
    let pageName = pageData.urlName.split('/')[0]
    console.log(pageName);
    dispatch('contentListData',{
      pageName:pageName,
      queryInfo:{
        offset:0,
        size:100
      }
    })
  },
  async deleteData({dispatch},pageData){
    let res = await delD(pageData.urlName,pageData.id)
    console.log(res);
    dispatch('contentListData',{
      pageName:pageData.urlName,
      queryInfo:{
        offset:0,
        size:100
      }
    })
  },
};

const getters = {
  pageListData(state) {
    console.log(222);
    console.log(state.urlName);
    switch (state.urlName) {
      case "users":
        return { list: state.usersList, count: state.usersCount } || {};
      case "role":
        return { list: state.roleList, count: state.roleCount } || {};
      case "department":
        return { list: state.departmentList, count: state.departmentCount } || {}
      case "menu":
        return { list: state.menuList, count: state.menuCount } || {};
      case "goods":
        return { list :state.goodsList, count:state.goodsCount } || {}
    }
  },
  departmentOption(state){
    let handlerDepartment = state.departmentList.map(item=>{
      return {value:item.id,title:item.name}
    })
    return handlerDepartment || []
  },
  roleOption(state){
    let handlerRole = state.roleList.map(item=>{
      return {value:item.id,title:item.name}
    })
    return handlerRole || []
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
