<template>
  <main>
    <div id="profile" class="wrapper" v-if="allUsersForAdmin.length">
      <h1 class="h2 main__title">Users Admin</h1>
      <table>
        <thead>
          <th class="text--left">Name</th>
          <th class="text--right">Payment</th>
        </thead>
        <tbody>
          <tr v-for="user in allUsersForAdmin">
            <td>{{ user. name }}</td>
            <td v-if="!user.paid" class="text--right">
              <button class="btn" @click="confirmPayment(user.user_id)">Confirm payment</button>
            </td>
            <td v-else class="text--right">
              Confirmed
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'
  import store from '../store'

  export default {
    name: 'UserAdmin',
    data () {
      return {
        users: []
      }
    },
    computed: {
      ...mapGetters([
        'allUsersForAdmin'
      ])
    },
    mounted () {

      this.$store
      .dispatch('LOAD_ALL_USERS')
      .then((response) => {
        console.log('All users loaded')
      }, (err) => {
        console.log(err)
      })
    },
    methods: {
      async confirmPayment(user_id) {
        await this.$store.dispatch('CONFIRM_PAYMENT', user_id).then((response) => {
          this.$store.dispatch('LOAD_ALL_USERS')
          .then((response) => {
            console.log('All users loaded')
          })
        }, (err) => {
          console.log(err)
        })
      }
    }
  }
</script>
