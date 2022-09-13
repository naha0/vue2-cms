# elm

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

亮点：动态路由、组件的二次封装

遇到得问题：
封装二次封装的时候，有数据在修改之后，不能在页面渲染出来，但是可以在打印台和devtool里面看到修改得数据，因为数据没有得到响应式，用this.$set解决这个问题
this.$set有三个参数：改变的对象，改变对象的属性，要修改完的值

动态路由，未完成
page-search 查询会报401
page-content 没命名的slot不显示

