<template>
  <table class="rank-grid">
    <thead class="rank-grid__head">
      <tr>
        <th @click="sort('rank')" class="rank-grid__td">
          Rank
          <!-- <span v-if="sortKey === 'rank' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'rank' && sortDirection === 'des'"> &darr;</span> -->
        </th>
        <th @click="sort('name')" class="rank-grid__td">
          Name
          <!-- <span v-if="sortKey === 'name' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'name' && sortDirection === 'des'"> &darr;</span> -->
        </th>
        <th @click="sort('score')" class="rank-grid__td">
          Score
          <!-- <span v-if="sortKey === 'score' && sortDirection === 'asc'"> &uarr;</span>
          <span v-if="sortKey === 'score' && sortDirection === 'des'"> &darr;</span> -->
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in sortedData" class="rank-grid__row">
        <td class="rank-grid__td">
          <router-link :to="{ name: 'user', params: { id: `${user.user_id}` } }">
            {{ user.rank }}
          </router-link>
        </td>
        <td class="rank-grid__td">
          <router-link :to="{ name: 'user', params: { id: `${user.user_id}` } }" :class="`rank-grid__name-col`">
            <avatar :src="user.avatar" class="rank-grid__avatar" />
            <div class="rank-grid__name">{{ user.name }}</div>
          </router-link>
        </td>
        <td class="rank-grid__td">
          <router-link :to="{ name: 'user', params: { id: `${user.user_id}` } }">
            {{ user.points.toFixed(2) }}
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
      data: Array
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
