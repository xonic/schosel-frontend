<template>
  <table>
    <thead>
      <tr>
        <th @click="sort('id')">
          Match
          <span v-if="sortKey === 'id' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'id' && sortDirection === 'des'"> &darr;</span>
        </th>
        <th @click="sort('bet')">
          Bet
          <span v-if="sortKey === 'bet' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'bet' && sortDirection === 'des'"> &darr;</span>
        </th>
        <th @click="sort('outcome')">
          Outcome
          <span v-if="sortKey === 'superbet' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'superbet' && sortDirection === 'des'"> &darr;</span>
        </th>
        <th @click="sort('superbet')">
          Superbet
          <span v-if="sortKey === 'superbet' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'superbet' && sortDirection === 'des'"> &darr;</span>
        </th>
        <th @click="sort('kings-game')">
          King's Game
          <span v-if="sortKey === 'kings-game' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'kings-game' && sortDirection === 'des'"> &darr;</span>
        </th>
        <th @click="sort('oldfashioned')">
          Oldfashioned
          <span v-if="sortKey === 'oldfashioned' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'oldfashioned' && sortDirection === 'des'"> &darr;</span>
        </th>
        <th @click="sort('underdog')">
          Underdog
          <span v-if="sortKey === 'underdog' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'underdog' && sortDirection === 'des'"> &darr;</span>
        </th>
        <th @click="sort('balanced')">
          Balanced
          <span v-if="sortKey === 'balanced' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'balanced' && sortDirection === 'des'"> &darr;</span>
        </th>
        <th @click="sort('secret')">
          Secret
          <span v-if="sortKey === 'secret' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'secret' && sortDirection === 'des'"> &darr;</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in sortedData">
        <td>
          <router-link :to="{ name: 'result', params: { id: `${result.id}` } }">
            {{ result.match }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'result', params: { id: `${result.id}` } }">
            {{ result.bet }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'result', params: { id: `${result.id}` } }">
            {{ result.outcome }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'result', params: { id: `${result.id}` } }">
            <super-bet v-if="result.superbet" :correct="result.score ? true : false" />
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'result', params: { id: `${result.id}` } }">
            {{ result.score }}
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
        sortKey: 'id',
        sortDirection: 'des'
      }
    },
    computed: {
      sortedData() {
        return this.data.sort((a, b) => {
          // Check what key to sort by
          switch(this.sortKey) {
            case 'id':
              if(this.sortDirection === 'asc') {
                return a.id > b.id
              }
              else {
                return a.id < b.id
              }
            break
            case 'bet':
              if(this.sortDirection === 'asc') {
                return a.bet > b.bet
              }
              else {
                return a.bet < b.bet
              }
            break
            case 'outcome':
              if(this.sortDirection === 'asc') {
                return a.outcome > b.outcome
              }
              else {
                return a.outcome < b.outcome
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
            case 'kings-game':
              if(this.sortDirection === 'asc') {
                return a.score > b.score
              }
              else {
                return a.score < b.score
              }
            default:
              if(this.sortDirection === 'asc') {
                return a.id > b.id
              }
              else {
                return a.id < b.id
              }
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
