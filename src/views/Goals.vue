<template>
  <div class="goals">
    <clip-loader :loading="loading.matches" :color="'#3EABDC'" :size="'64px'">#</clip-loader>
    <div v-if='!loading.status' class='wrapper'>
      <div class="tab-grid">
         <div class="tabs">
           <ul class="tab__items wrapper">
             <li>
               <router-link :to="{ name: 'gambler' }" class="tab__link tab__link--tight">Gambler</router-link>
             </li>
             <li>
               <router-link :to="{ name: 'hustler' }" class="tab__link tab__link--tight">Hustler</router-link>
             </li>
             <li>
               <router-link :to="{ name: 'expert' }" class="tab__link tab__link--tight">Expert</router-link>
             </li>
             <li>
               <router-link :to="{ name: 'hattrick' }" class="tab__link tab__link--tight">Hattrick</router-link>
             </li>
             <li>
               <router-link :to="{ name: 'secret' }" class="tab__link tab__link--tight">Secret</router-link>
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
  name: 'goals',
  computed: {
    ...mapGetters([
      'loggedInUser',
      'loading'
    ])
  },
  components: {
    ClipLoader
  }
}
</script>
