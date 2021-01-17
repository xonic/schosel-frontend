<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Scores</h1>
      <ul v-if="scores">
        <li v-for="(score, index) in scores">
          <router-link :to="{ name: score.challenge_route, params: { id: score.challenge_id + '' } }">
            <img :src="getURL(index)" width="24"/>
            <div>
              {{ score.name }}
            </div>
            <div>
              {{ score.description }}
            </div>
            <div>SVG bar</div>
            <ul>
              <li v-for="user in score.users">
                <div>
                  {{ user.rank }}.
                </div>
                <div>
                  {{ user.name }}
                </div>
                <div>
                  {{ user.score }}
                </div>
                <div>
                  <img src="../assets/img/icons/i--chevron-right.svg" />
                </div>
              </li>
            </ul>
          </router-link>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'scores',
  computed: {
    ...mapGetters([
      'scores',
      'iconPaths'
    ])
  },
  methods: {
    getURL(index) {
      return require(`../assets/img/icons/${this.iconPaths[index]}`)
    }
  }
}
</script>
