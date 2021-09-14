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
            <li>That email is invalid.</li>          
          </ul>
          <form @submit.prevent="onSubmit">            
            <fieldset v-if="!isLogin" class="form-group">            
              <input class="form-control form-control-lg" type="text" placeholder="Your Name">    
            </fieldset>            
            <fieldset class="form-group">              
              <input class="form-control form-control-lg" type="email" placeholder="Email"
                v-model="user.email">        
            </fieldset>            
            <fieldset class="form-group">              
              <input class="form-control form-control-lg" type="password" placeholder="Password"
                v-model="user.password">  
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
export default {
  name: 'LoginIndex',
  asyncData () { },
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    isLogin () { return this.$route.path === '/login' }
  },
  methods: {
    async onSubmit () {
      try {
        const { data } = await login({ user: this.user })
        // console.log(data)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style>
</style>