import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2b0b774c = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _4b93dcfe = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _6cc46707 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _266d91c7 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _3884b7c5 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _1f3c9d8f = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _0d37d514 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _2b0b774c,
    children: [{
      path: "",
      component: _4b93dcfe,
      name: "home"
    }, {
      path: "/login",
      component: _6cc46707,
      name: "login"
    }, {
      path: "/register",
      component: _6cc46707,
      name: "register"
    }, {
      path: "/profile",
      component: _266d91c7,
      name: "profile"
    }, {
      path: "/settings",
      component: _3884b7c5,
      name: "settings"
    }, {
      path: "/editor",
      component: _1f3c9d8f,
      name: "editor"
    }, {
      path: "/article",
      component: _0d37d514,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
