<template>
  <div class="score">
    <clip-loader :loading="loading.matches" :color="'#3EABDC'" :size="'64px'">#</clip-loader>
    <div v-if='!loading.status' class='wrapper'>
      <div class="tab-grid">
         <div class="tabs">
           <ul class="tab__items wrapper">
             <li>
               <router-link :to="{ name: 'schosel' }" class="schosel tab__link tab__link--tight">Schosel</router-link>
             </li>
             <li>
               <router-link :to="{ name: 'gambler' }" class="oldfashioned tab__link tab__link--tight">Oldfashioned</router-link>
             </li>
             <li>
               <router-link :to="{ name: 'hustler' }" class="underdog tab__link tab__link--tight">Underdog</router-link>
             </li>
             <li>
               <router-link :to="{ name: 'expert' }" class="loser tab__link tab__link--tight">Loser</router-link>
             </li>
             <li>
               <router-link :to="{ name: 'hattrick' }" class="balanced tab__link tab__link--tight">Balanced</router-link>
             </li>
             <li>
               <router-link :to="{ name: 'secret' }" class="secret tab__link tab__link--tight">Hidden</router-link>
             </li>
           </ul>
         </div>
         <div class="tabs-details">
           <router-view />
         </div>
       </div>
     </div>
    <!-- <div class="wrapper">
      <div class="hero hero--2">
        <transition name="hero" appear>
          <div>
            <h1 class="hero__heading">Score</h1>
            <div class="hero__info" v-if='loggedInUser && loggedInUser.points'>{{ loggedInUser.points.toFixed(2) }} pts</div>
          </div>
        </transition>
      </div>
      <clip-loader :loading="loading.users" :color="loading.color" :size="loading.size"></clip-loader>
        <div v-if="!loading.users">
          <transition name="content" appear>
            <div>
            <div class="island" v-if="allUsers && allUsers.length">
              <grid
                :data="gridData"
                :columns="gridColumns"
                :hasLinks="true"
                :linkToComponent="'user'"
                :idKey="'user_id'">
              </grid>
            </div>
            <h2 v-else class="blankslate">There is no score ranking yet</h2>
          </div>
        </transition>
      </div>
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Grid from '@/components/Grid.vue'
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'score',
  computed: {
    ...mapGetters([
      'allUsers',
      'loggedInUser',
      'loading'
    ]),
    gridData () {
      if(this.allUsers) {
        this.allUsers.forEach((el) => {
          el.points = parseFloat(el.points).toFixed(2)
        })
        return this.allUsers
      }
    }
  },
  components: {
    Grid,
    ClipLoader
  },
  data () {
    return {
      gridColumns: ['rank', 'name', 'extras', 'points', 'reward']
    }
  }
}
</script>
