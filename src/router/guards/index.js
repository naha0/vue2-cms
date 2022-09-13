import setupPermission from './permission'

export default function createRouterGuards(router){
    setupPermission(router)
}