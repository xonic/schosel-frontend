<template>
  <div id="login" class="external-pages">
    <h1>Login</h1>
    <div class="login-form">
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">Email</label>
          <input
                  type="email"
                  id="email"
                  v-model="email">
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password">
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
          <router-link :to="{ name: 'register' }">Register</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'login',
    data () {
      return {
        email: '',
        password: ''
      }
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
