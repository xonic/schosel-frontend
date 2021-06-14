<template>
  <main>
    <div id="login" class="wrapper external-page">
      <h1 class="h2 main__title">
        Login
      </h1>
      <!-- <div class="to-register">
        No account yet?
        <router-link :to="{ name: 'register' }">Register now!</router-link>
      </div> -->
      <div class="to-register">
        Need a new password?
        <router-link :to="{ name: 'requestReset' }">Reset password</router-link>
      </div>
      <ul v-if="errors" class="errors">
        <li v-for="error in errors">
          <message type="error">
            {{ error }}
          </message>
        </li>
      </ul>
      <message v-if="this.$route.query.registered" type="success">
        Alright, you're registered
      </message>
      <message v-if="this.$route.query.reset_password" type="success">
        OK, just sent you a reset link via email.
      </message>
      <message v-if="this.$route.query.reset" type="success">
        Password updated! You can login now.
      </message>
      <div class="login-form">
        <form @submit.prevent="onSubmit">
          <div class="input">
            <!-- <label for="email">Email</label> -->
            <input
                    placeholder="Email"
                    type="email"
                    id="email"
                    v-model="email">
          </div>
          <div class="input">
            <!-- <label for="password">Password</label> -->
            <input
                    placeholder="Password"
                    type="password"
                    id="password"
                    v-model="password">
          </div>
          <div class="submit">
            <button class="btn btn--primary" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Message from '@/components/Message.vue'

  export default {
    name: 'login',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    components: {
      Message
    },
    computed: {
      ...mapGetters([
        'errors'
      ])
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
        }
        this.$store.dispatch('LOGIN', {email: formData.email, password: formData.password, redirect: this.$route.query.redirect })
      }
    }
  }
</script>
