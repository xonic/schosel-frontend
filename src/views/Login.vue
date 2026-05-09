<template>
  <main>
    <div id="login" class="wrapper external-page">
      <h1 class="h2 main__title">
        Login
      </h1>
      <div class="to-register">
        No account yet?
        <router-link :to="{ name: 'register' }">Register now!</router-link>
      </div>
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
      <!-- Remove login-debug div -->
      <div v-if="dbUri" class="login-debug">
        <div class="text--small text--gray-20">Current SQLALCHEMY_DATABASE_URI:</div>
        <pre>{{ dbFilename }}</pre>
      </div>
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
  // Remove unused imports
  import { HTTP } from '@/http-constants'

  export default {
    name: 'login',
    data () {
      return {
        email: '',
        password: '',
        // Remove dbUri from data, as it's only used for debugging and should not be part of the component's state
        dbUri: null
      }
    },
    components: {
      Message
    },
    computed: {
      ...mapGetters([
        'errors'
      ]),
      // Remove dbFilename computed property, as it's only used for debugging and should not be part of the component's logic
      dbFilename () {
        if (!this.dbUri) return null
        const segments = this.dbUri.split('/')
        return segments[segments.length - 1] || this.dbUri
      }
    },
    created () {
      // Remove loadDbUri call from created hook, as it's only used for debugging and should not be part of the component's lifecycle
      this.loadDbUri()
    },
    methods: {
      // Remove loadDbUri method, as it's only used for debugging and should not be part of the component's methods
      async loadDbUri () {
        try {
          const response = await HTTP.get('/login-info')
          this.dbUri = response.data.sqlalchemy_database_uri
        }
        catch (error) {
          console.error('Unable to load login debug info:', error)
        }
      },
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
