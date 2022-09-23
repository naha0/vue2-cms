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

亮点：动态路由、组件的二次封装、动态插槽

遇到得问题：
封装二次封装的时候，有数据在修改之后，不能在页面渲染出来，但是可以在打印台和devtool里面看到修改得数据，因为数据没有得到响应式
对象声明之后，增删改对象中的属性，页面不能进行响应式，用this.$set解决这个问题
this.$set有三个参数：改变的对象，改变对象的属性，要修改完的值


组件 -> page-content -> zTable 
zTable中使用插槽除了选择和序号两列，如果只是需要传值可以通过row.[item.prop]直接得到数据,如果组件中还需要对数据进行处理，就用具名插槽和作用域插槽和动态插槽
page-content中使用插槽，在users中固定了插槽的名称，除了几个之外过滤成为otherSlotName,把这些再改为具名插槽和作用域插槽和动态插槽
组件中传入的某一项中有slotName,则这一项需要通过具名插槽和作用域插槽在组件中加入数据处理，


