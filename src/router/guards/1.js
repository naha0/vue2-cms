let foo = {
    name:'张三',
    age:'18',
    student:{
        name:'喜羊羊'
    }
}

let foo1 = {
    name:'王五',
    age:'19'
}

let bar = Object.assign(foo,foo1)
console.log(bar);
bar.name = '李四'
console.log(bar);
console.log(foo);
bar.student.name = '懒洋洋'
console.log(bar);
console.log(foo);