<template>
  <table>
    <thead>
      <tr>
        <th @click="sort('name')">
          Name
          <span v-if="sortKey === 'name' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'name' && sortDirection === 'des'"> &darr;</span>
        </th>
        <th @click="sort('bet')">
          Bet
          <span v-if="sortKey === 'bet' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'bet' && sortDirection === 'des'"> &darr;</span>
        </th>
        <th @click="sort('superbet')">
          Superbet
          <span v-if="sortKey === 'superbet' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'superbet' && sortDirection === 'des'"> &darr;</span>
        </th>
        <th @click="sort('score')">
          Score
          <span v-if="sortKey === 'score' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'score' && sortDirection === 'des'"> &darr;</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in sortedData">
        <td>
          <router-link :to="{ name: 'user', params: { id: `${user.id}` } }">
            <avatar :src="user.avatar" />
            {{ user.name }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'user', params: { id: `${user.id}` } }">
            {{ user.bet }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'user', params: { id: `${user.id}` } }">
            <super-bet v-if="user.superbet" :correct="user.score ? true : false" />
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'user', params: { id: `${user.id}` } }">
            {{ user.score }}
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import Avatar from '@/components/Avatar'
  import SuperBet from '@/components/SuperBet'

  export default {
    name: "result-grid",
    props: {
      data: Array,
    },
    components: {
      Avatar,
      SuperBet
    },
    data () {
      return {
        sortKey: 'score',
        sortDirection: 'des'
      }
    },
    computed: {
      sortedData() {
        return this.data.sort((a, b) => {
          // Check what key to sort by
          switch(this.sortKey) {
            case 'bet':
              if(this.sortDirection === 'asc') {
                return a.bet > b.bet
              }
              else {
                return a.bet < b.bet
              }
            break
            case 'superbet':
              if(this.sortDirection === 'asc') {
                return a.superbet > b.superbet
              }
              else {
                return a.superbet < b.superbet
              }
            break
            case 'name':
              if(this.sortDirection === 'asc') {
                return a.name > b.name
              }
              else {
                return a.name < b.name
              }
            break
            case 'score':
              if(this.sortDirection === 'asc') {
                return a.score > b.score
              }
              else {
                return a.score < b.score
              }
            break
            default:

            break
          }
        })
      }
    },
    methods: {
      sort(key) {
        if(this.sortKey === key) {
          this.sortDirection === 'asc' ? this.sortDirection = 'des' : this.sortDirection = 'asc'
        }
        else {
          this.sortKey = key
          this.sortDirection = 'asc'
        }
      }
    }
  }
</script>
