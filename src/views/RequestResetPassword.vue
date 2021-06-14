<template>
  <main>
    <div id="reset" class="wrapper external-page">
      <h1 class="h2 main__title">
        Need a new password?
      </h1>
      <div class="login-form">
        <form @submit.prevent="onSubmit">
          <div class="input">
            <input
              placeholder="Email"
              type="email"
              id="email"
              v-model="email">
          </div>
          <div class="submit" style="display: flex; align-items:center;">
            <button class="btn btn--primary" type="submit">Send</button>
            <div class="to-login" style="margin:0 0 0 1.6rem;">
              <router-link :to="{ name: 'login' }">Back to login</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'requestReset',
    data () {
      return {
        email: ''
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
        }
        this.$store.dispatch('REQUEST_RESET_PASSWORD', { "email": this.email })
      }
    }
  }
</script>
