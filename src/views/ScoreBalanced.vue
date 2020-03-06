<template>
  <div class="score">
    <h1>Balanced</h1>
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
    name: 'balanced',
    data () {
      return {
        mockUsers: []
      }
    },
    mounted () {
      this.mockUsers = json
      this.mockUsers.sort((a, b) => a.ranking[3].rank > b.ranking[3].rank)
    }
  }
</script>
