import {
  goodsCategoryCount,
  goodsCategorySale,
  goodsCategoryFavor,
  goodsAddressSale,
} from "@/api";

const state = {
  categoryCount: [],
  categorySale: [],
  categoryFavor: [],
  addressSale: [],
};

const mutations = {
  changeGoodsCategoryCount(state, categoryCount) {
    state.categoryCount = categoryCount;
  },
  changeGoodsCategorySale(state, categorySale) {
    state.categorySale = categorySale;
  },
  changeGoodsCategoryFavor(state, categoryFavor) {
    state.categoryFavor = categoryFavor;
  },
  changeGoodsAddressSale(state, addressSale) {
    state.addressSale = addressSale;
  },
};

const actions = {
  // 获取商品统计分类数量
  async getDashboardMsg({ commit }) {
    let res = await goodsCategoryCount();
    console.log(res);
    commit("changeGoodsCategoryCount", res.data);
    let res1 = await goodsCategorySale();
    commit("changeGoodsCategorySale", res1.data);
    let res2 = await goodsCategoryFavor();
    commit("changeGoodsCategoryFavor", res2.data);
    let res3 = await goodsAddressSale();
    commit("changeGoodsAddressSale", res3.data);
  },
};

const getters = {
  handlerCategoryCount(state) {
    return state.categoryCount.map((item) => {
      return { value: item.goodsCount, name: item.name };
    }) || []
  },
  handlerCategorySale(state){
    return state.categorySale.map(item=>{
        return item.goodsCount
    }) || []
  },
  handlerCategoryName(state){
    return state.categoryCount.map(item=>{
        return item.name
    }) || []
  },
  handlerCategoryFavor(state){
    return state.categoryFavor.map(item=>{
        return item.goodsFavor
    }) || []
  },
  handlerAddressSale(state){
    return state.addressSale.map(item=>{
      return {name:item.address,value:item.count}
    }) || []
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
