export function addMenuCom(){
    // const menuData = this.$store.state.main.menuData
    // console.log(menuData);
}

export function judgeName(data){
    console.log(data);
    switch (data) {
        case 'analysis':
            return '系统总览'
        case 'system':
            return '系统管理'
        case 'product':
            return '商品中心'
        case 'story':
            return '随便聊聊'
        default:
            return ''
    }
}
