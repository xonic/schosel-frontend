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
