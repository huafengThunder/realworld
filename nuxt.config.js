module.exports={
  router:{
    extendRoutes (routes, resolve) {
      // console.log(routes)
      routes.splice(0) //清除默认的路由
      routes.push(...[{
        path:'/',
        component: resolve(__dirname,'pages/layout/'),
        children:[
          {
            path:'',//默认子路由
            name:'home',
            component: resolve(__dirname,'pages/home/')
          },
          {
            path: '/login',
            name: 'login',
            component: resolve(__dirname, 'pages/login/')
          },
          {
            path: '/register',
            name: 'register',
            component: resolve(__dirname, 'pages/login/')
          },
          {
            path: '/profile',
            name: 'profile',
            component: resolve(__dirname, 'pages/profile/')
          },
          {
            path: '/settings',
            name: 'settings',
            component: resolve(__dirname, 'pages/settings/')
          },
          {
            path: '/editor',
            name: 'editor',
            component: resolve(__dirname, 'pages/editor/')
          },
          {
            path: '/article',
            name: 'article',
            component: resolve(__dirname, 'pages/article/')
          }
        ]
      }])
    }
  }
}