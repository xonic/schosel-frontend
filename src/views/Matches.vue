<template>
  <div class="matches">
    <clip-loader :loading="loading.matches || loading.status" :color="'#3EABDC'" :size="'64px'">#</clip-loader>
    <div v-if='!loading.status && !loading.matches' class='wrapper'>
      <div class="tab-grid" v-if="playedMatches.length || liveMatches.length">
         <div class="tabs">
           <ul class="tab__items wrapper">
             <li v-if="playedMatches.length">
               <router-link :to="{ name: 'played' }" class="tab__link">Played</router-link>
             </li>
             <li v-if="liveMatches.length === 1">
               <router-link :to="{ name: 'match', params: { id: liveMatches[0].match_id} }" class="tab__link">Live</router-link>
             </li>
             <li v-if="liveMatches.length > 1">
               <router-link :to="{ name: 'live' }" class="tab__link">Live</router-link>
             </li>
             <li>
               <router-link :to="{ name: 'upcoming' }" class="tab__link">Upcoming</router-link>
             </li>
           </ul>
         </div>
         <div class="tabs-details">
           <router-view />
         </div>
       </div>
       <div class="wrapper" v-else>
         <router-view />
       </div>
     </div>
   </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'matches',
  computed: {
    ...mapGetters([
      'playedMatches',
      'liveMatches',
      'upcomingMatches',
      'loading'
    ])
  },
  components: {
    ClipLoader
  }
}
</script>
