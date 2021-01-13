<template>
  <table>
    <thead>
      <tr>
        <th @click="sort('rank')">
          Rank
          <span v-if="sortKey === 'rank' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'rank' && sortDirection === 'des'"> &darr;</span>
        </th>
        <th @click="sort('name')">
          Name
          <span v-if="sortKey === 'name' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'name' && sortDirection === 'des'"> &darr;</span>
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
            {{ user.rank }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'user', params: { id: `${user.id}` } }">
            <avatar :src="user.avatar" />
            {{ user.name }}
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

  export default {
    name: "rank-grid",
    props: {
      data: Array,
    },
    components: {
      Avatar
    },
    data () {
      return {
        sortKey: 'rank',
        sortDirection: 'asc'
      }
    },
    computed: {
      sortedData() {
        return this.data.sort((a, b) => {
          // Check what key to sort by
          switch(this.sortKey) {
            case 'rank':
              if(this.sortDirection === 'asc') {
                return a.rank > b.rank
              }
              else {
                return a.rank < b.rank
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
              if(this.sortDirection === 'asc') {
                return a.rank > b.rank
              }
              else {
                return a.rank < b.rank
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
