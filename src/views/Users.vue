<template>
  <main>
    <h1>Users</h1>
    <ul>
      <li>
        <router-link :to="{ name: 'user', params: { id: '1' } }">
          <div>
            Georg N.
          </div>
          <ul>
            <li>Icon KngGm 1.</li>
            <li>Icon Oldfsnd 1.</li>
            <li>Icon Undg 1.</li>
            <li>Icon Blncd 1.</li>
            <li>Icon Scrt 1.</li>
          </ul>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'user', params: { id: '3' } }">
          <div>
            Tom N.
          </div>
          <ul>
            <li>Icon KngGm 1.</li>
            <li>Icon Oldfsnd 1.</li>
            <li>Icon Undg 1.</li>
            <li>Icon Blncd 1.</li>
            <li>Icon Scrt 1.</li>
          </ul>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'user', params: { id: '4' } }">
          <div>
            Carloz S.
          </div>
          <ul>
            <li>Icon KngGm 1.</li>
            <li>Icon Oldfsnd 1.</li>
            <li>Icon Undg 1.</li>
            <li>Icon Blncd 1.</li>
            <li>Icon Scrt 1.</li>
          </ul>
        </router-link>
      </li>
    </ul>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'users',
  computed: {
    ...mapGetters([
      'allUsers',
    ])
  },
}
</script>
