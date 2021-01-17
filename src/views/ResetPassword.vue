<template>
  <main>
    <div id="reset" class="wrapper external-page">
      <h1 class="h2 main__title">
        Reset password
      </h1>
      <div class="to-register">
        Or
        <router-link :to="{ name: 'login' }">Login instead!</router-link>
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
          <div class="submit">
            <button class="btn btn--primary" type="submit">Send reset link</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'reset',
    data () {
      return {
        email: ''
      }
    },
    methods: {
    //   onSubmit () {
    //     const formData = {
    //       email: this.email,
    //       password: this.password,
    //     }
    //     this.$store.dispatch('LOGIN', {email: formData.email, password: formData.password, redirect: this.$route.query.redirect })
    //   }
    }
  }
</script>
