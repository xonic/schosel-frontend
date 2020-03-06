<template>
  <div class="score">
    <h1>Underdog</h1>
    <ol>
      <li v-for="user in mockUsers">
        {{ user.name }}
      </li>
    </ol>
  </div>
</template>

<script>
  import json from '@/data/Rank.json'

  export default {
    name: 'underdog',
    data () {
      return {
        mockUsers: []
      }
    },
    mounted () {
      this.mockUsers = json
      this.mockUsers.sort((a, b) => a.ranking[2].rank > b.ranking[2].rank)
    }
  }
</script>
