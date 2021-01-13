<template>
  <div class="stats">
    <clip-loader :loading="loading.matches" :color="'#3EABDC'" :size="'64px'">#</clip-loader>
    <div v-if='!loading.status' class='wrapper'>
      <div class="tab-grid">
         <div class="tabs">
           <ul class="tab__items wrapper">
             <li>
               <router-link :to="{ name: 'players' }" class="tab__link">Players</router-link>
             </li>
             <li>
               <router-link :to="{ name: 'teams' }" class="tab__link">Teams</router-link>
             </li>
             <li>
               <router-link :to="{ name: 'match-stats' }" class="tab__link">Matches</router-link>
             </li>
           </ul>
         </div>
         <div class="tabs-details">
           <router-view />
         </div>
       </div>
     </div>
   </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'stats',
  computed: {
    ...mapGetters([
      'loading'
    ])
  },
  components: {
    ClipLoader
  }
}
</script>
