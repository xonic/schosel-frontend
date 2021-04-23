<template>
  <main>
    <div id="register" class="wrapper external-page">
      <h1 class="h2 main__title">
        Register
      </h1>
      <div class="to-login">
        Already have an account?
        <router-link :to="{ name: 'login' }">Login now!</router-link>
      </div>
      <div class="register-form">
        <form @submit.prevent="onSubmit">
          <div class="avatar-selection">
            <div class="avatar-selection__inputs">
              <div class="input">
                <input type="text" id="firstName" v-model="firstName" placeholder="First Name">
              </div>
              <div class="input">
                <input type="text" id="lastName" v-model="lastName" placeholder="Last Name">
              </div>
            </div>
            <div class="avatar-selection__avatar">
              <img :src="avatar" size="large" />
            </div>
          </div>
          <div class="input">
            <input type="email" id="email" v-model="email" placeholder="Email">
          </div>
          <div class="input">
            <input type="password" id="password" v-model="password" placeholder="Password">
            <div class="text--small text--gray-20">Minimum 8 characters</div>
          </div>
          <div class="submit">
            <button class="btn btn--primary" type="submit">Submit</button>
            <p v-if="error">{{ error }}</p>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
  // @ is an alias to /src
  import store from '../store'

  export default {
    name: 'register',
    data() {
      return {
        error: null,
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    },
    computed: {
      avatar() {
        if (!this.firstName.length && !this.lastName.length) return
        return store.state.avatarUrl + this.firstName + " " + this.lastName.substring(0,1) + "."
      }
    },
    methods: {
      onSubmit() {

        if (!this.firstName || !this.lastName || !this.email || !this.password) {
          this.error = 'Please fill all fields.'
          return
        }

        const formData = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        }
        this.$store.dispatch('SET_ERRORS', { errors: [] })
        this.$store.dispatch('REGISTER', formData)
      }
    }
  }
</script>
