<template>
  <table>
    <thead>
      <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in data">
        <td>
          <router-link :to="{ name: 'user', params: { id: user.id } }">
            {{ user.rank }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'user', params: { id: user.id } }">
            <img :src="user.avatar" style="width: 32px; border-radius: 999em; margin-right:12px;">
            {{ user.name }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'user', params: { id: user.id } }">
            {{ user.score }}
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "rank-grid",
    props: {
      data: Array,
    }
  }
</script>
