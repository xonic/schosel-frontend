<template>
  <div class="matches">
    <clip-loader :loading="loading.matches" :color="'#3EABDC'" :size="'64px'">#</clip-loader>
    <div v-if='!loading.status' class='wrapper'>
      <div class="tab-grid">
         <div class="tabs">
           <ul class="tab__items wrapper">
             <li>
               <router-link :to="{ name: 'played' }" class="tab__link">Played</router-link>
             </li>
             <li>
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
      'loading'
    ])
  },
  components: {
    ClipLoader
  }
}
</script>
