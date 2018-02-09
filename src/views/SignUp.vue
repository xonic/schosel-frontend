<template>
  <form>
    <h1>Sign up</h1>
    <label for="first-name">First name</label>
    <input id="first-name" type="text" name="first-name" v-model.lazy.trim="firstName">

    <label for="last-name">Last name</label>
    <input id="last-name" type="text" name="last-name" placeholder="Only initial will be shown to other players" v-model.lazy.trim="lastName">

    <label for="email">Email</label>
    <input id="email" type="email" name="email" v-model.lazy.trim="email">

    <label for="phone">Phone <span>(optional)</span></label>
    <input id="phone" type="tel" name="phone" placeholder="To join our Whatsapp group" v-model.lazy.trim="phone">

    <label for="password">Password</label>
    <input id="password" type="password" name="password" v-model.lazy.trim="password">

    <button @click.prevent="submit()">Sign up</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      isSubmitted: false
    }
  },
  methods: {
    submit() {
      this.isSubmitted = true
    }
  }
}
</script>
