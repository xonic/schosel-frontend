<template>
  <main>
    <div class="wrapper" v-if="allUsersForAdmin.length">
      <h1 class="h2 main__title">Payments</h1>
      <table class="rank-grid text--small admin">
        <thead class="rank-grid__head">
          <th class="rank-grid__td">ID</th>
          <th class="rank-grid__td">Name</th>
          <th class="rank-grid__td">Email</th>
          <th class="rank-grid__td">Paid</th>
          <th class="rank-grid__td">PWD</th>
        </thead>
        <tbody>
          <tr v-for="user in allUsersForAdmin" class="rank-grid__row">
            <td class="rank-grid__td">{{ user.user_id }}</td>
            <td class="rank-grid__td nowrap">{{ user.name }}</td>
            <td class="rank-grid__td text--tiny">{{ user.email }}</td>
            <td v-if="!user.paid" class="rank-grid__td text--tiny text--red">No</td>
            <td v-else class="rank-grid__td text--tiny text--green">Yes</td>
            <td class="rank-grid__td text--tiny">
              <a href @click.prevent="resetPwd(user.user_id)">Reset</a>
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
    computed: {
      ...mapGetters([
        'allUsersForAdmin'
      ])
    },
    mounted () {

      this.$store
      .dispatch('LOAD_ALL_USERS')
      .then((response) => {
      }, (err) => {
        console.log(err)
      })
    },
    methods: {
      // async confirmPayment(user_id) {
      //   await this.$store.dispatch('CONFIRM_PAYMENT', user_id).then((response) => {
      //     this.$store.dispatch('LOAD_ALL_USERS')
      //   }, (err) => {
      //     console.log(err)
      //   })
      // }
      async resetPwd(user_id) {
        await this.$store.dispatch('RESET_PWD', user_id).then((response) => {
          console.log(response)
        }, (err) => {
          console.log(err)
        })
      }
    }
  }
</script>
