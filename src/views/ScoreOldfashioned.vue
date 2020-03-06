<template>
  <div class="score">
    <h1>Oldfashioned</h1>
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
    name: 'oldfashioned',
    data () {
      return {
        mockUsers: []
      }
    },
    mounted () {
      this.mockUsers = json
      this.mockUsers.sort((a, b) => a.ranking[1].rank > b.ranking[1].rank)
    }
  }
</script>
