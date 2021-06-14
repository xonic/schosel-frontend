<template>
  <main>
    <div id="reset" class="wrapper external-page">
      <h1 class="h2 main__title">
        Set new password
      </h1>
      <div class="login-form">
        <form @submit.prevent="onSubmit">
          <div class="input">
            <input
                    placeholder="New password"
                    type="password"
                    id="password"
                    v-model="password">
            <div class="text--small text--gray-20">Minimum 8 characters</div>
          </div>
          <div class="submit">
            <button class="btn btn--primary" type="submit">Set new password</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'reset',
    props: ['id', 'token'],
    data () {
      return {
        password: ''
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          password: this.password,
        }
        this.$store.dispatch('RESET_PASSWORD', { "user_id": parseInt(this.id, 10), "reset_token": this.token, "new_password": formData.password })
      }
    }
  }
</script>
