<template>
  <main>
    <div class="wrapper" v-if="allUsersForAdmin.length">
      <h1 class="h2 main__title">Payments</h1>
      <table class="rank-grid text--small admin">
        <thead class="rank-grid__head">
          <th class="rank-grid__td">ID</th>
          <th class="rank-grid__td">Name</th>
          <th class="rank-grid__td" v-if="allUsersForAdmin[0].email">Email</th>
          <th class="rank-grid__td">Payment</th>
        </thead>
        <tbody>
          <tr v-for="user in allUsersForAdmin" class="rank-grid__row">
            <td class="rank-grid__td">{{ user.user_id }}</td>
            <td class="rank-grid__td">{{ user.name }}</td>
            <td class="rank-grid__td" v-if="allUsersForAdmin[0].email">{{ user.email }}</td>
            <td v-if="!user.paid" class="rank-grid__td">
              <a href @click="confirmPayment(user.user_id)">Confirm payment</a>
            </td>
            <td v-else class="rank-grid__td">
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
    name: 'Payments',
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
