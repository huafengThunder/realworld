<template>  
  <div class="auth-page">    
    <div class="container page">      
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">          
          <h1 class="text-xs-center"> {{ isLogin ? 'Sign in' : 'Sign up' }}</h1>          
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>            
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>          
          </p>
          <ul class="error-messages">            
            <!-- <li>That email is invalid.</li> -->
            <template v-for="(message,field) in errors">
              <li v-for="(msg,index) in message" :key="index">{{field}}{{msg}}</li>
            </template>
          </ul>
          <form @submit.prevent="onSubmit">            
            <fieldset v-if="!isLogin" class="form-group">            
              <input class="form-control form-control-lg" type="text" placeholder="Your Name"
                required v-model="user.username">    
            </fieldset>            
            <fieldset class="form-group">              
              <input class="form-control form-control-lg" type="email" placeholder="Email"
                v-model="user.email" required>        
            </fieldset>            
            <fieldset class="form-group">              
              <input class="form-control form-control-lg" type="password" placeholder="Password"
                minlength="8" required v-model="user.password">  
            </fieldset>            
            <button
              class="btn btn-lg btn-primary pull-xs-right"> {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>    
        </div>
      </div>    
    </div>  
  </div>
</template>
<script> 
import { login, register } from '../../api/user'
//客户端，服务端都能拿到cookie
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  computed: {
    isLogin () { return this.$route.path === '/login' }
  },
  methods: {
    async onSubmit () {
      try {
        const { data } = this.isLogin ? await login({ user: this.user }) : await register({ user: this.user })
        this.$store.commit('setUser', data.user) 
        Cookie.set("user", data.user) 
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.errors = err.response.data.errors
      }
    }
  }
}
</script>
<style>
</style>