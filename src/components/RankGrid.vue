<template>
  <table class="rank-grid">
    <thead class="rank-grid__head">
      <tr>
        <th class="rank-grid__td">
          Rank
        </th>
        <th class="rank-grid__td">
          Name
        </th>
        <th class="rank-grid__td">
          Reward
        </th>
        <th class="rank-grid__td">
          Score
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
            <!-- <avatar :src="user.avatar" class="rank-grid__avatar" /> -->
            <div v-if="user.champion" class="bet__flag">
              <flag :iso="user.champion.short_name" />
            </div>
            <div class="rank-grid__name">{{ user.name }}</div>
          </router-link>
        </td>
        <td class="rank-grid__td">
          <router-link :to="{ name: 'user', params: { id: `${user.user_id}` } }" class="nowrap">
            <span v-if="user.reward">{{ user.reward.toFixed(2) }} &euro;</span>
            <span v-else class="text--gray-20">-</span>
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
  import Flag from '@/components/Flag'

  export default {
    name: "rank-grid",
    props: {
      data: Array
    },
    components: {
      Avatar,
      Flag
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
    }
  }
</script>
