<template>
  <main>
    <div class="wrapper">
      <div class="help">
        <h1 class="h2 main__title">Rules</h1>
        <p>
          First of all <strong>join our WhatsApp group chat</strong> for latest news and high quality trash talk!<div><a class="btn btn--primary" href="https://chat.whatsapp.com/GjwUTS7lsamL9kBN4H4z5y">Join group chat</a></div>
        </p>
        <h2 class="h3">Payment</h2>
        <p>
          The participation fee for the whole tournament is <strong>15 EUR / 14 CHF</strong>. After registration you'll get an email containing the bank transfer and alternative PayPal payment instructions. In case you didn't get the email after registration, please let us know at <a href="mailto:team.schosel@gmail.com">team.schosel@gmail.com</a>.
        </p>
        <p>
          Every registered player <strong>will be disqualified</strong> if their participation fee is not transferred to the Schosel bank or PayPal account <strong>before the first match begins</strong>.
        </p>
        <h2 class="h3">Prize money</h2>
        <p>
          The pot equals the sum of all players’ participation fees. It will be fully paid out to the best players.
        </p>
        <ul>
          <li><strong>Schosel</strong> receives <strong>70%</strong> of the entire pot</li>
          <li><strong>Loser</strong> receives <strong>30%</strong> of the entire pot</li>
        </ul>
        <p>
          For each score, the prize money is distributed among the top 3 players as follows:
        </p>
        <ol>
          <li>First place <strong>50%</strong> of that score’s prize pool</li>
          <li>Second place <strong>35%</strong> of that score’s prize pool</li>
          <li>Third place <strong>15%</strong> of that score’s prize pool</li>
        </ol>
        <p>
          This means:
        </p>
        <h3 class="h4">Schosel (70% of total pot)</h3>
        <ul>
          <li>First place: <strong>35% of the whole pot</strong></li>
          <li>Second place: <strong>24.5% of the whole pot</strong></li>
          <li>Third place: <strong>10.5% of the whole pot</strong></li>
        </ul>
        <h3 class="h4">Loser (30% of total pot)</h3>
        <ul>
          <li>First place: <strong>15% of the whole pot</strong></li>
          <li>Second place: <strong>10.5% of the whole pot</strong></li>
          <li>Third place: <strong>4.5% of the whole pot</strong></li>
        </ul>
        <p>
          So if you land in first place in Schosel and third place in Loser, you receive <strong>39.5% of the entire pot</strong>. 
        </p>
        <h2 class="h3">Betting</h2>
        <p>
          You bet on the outcome of <strong>all 104 matches</strong> as well as on the final cup winner. For each correct bet you collect points based on automatically calculated odds.
        </p>
        <ul>
          <li><strong>During the whole tournament</strong> you can place <strong>8 super bets</strong> which double the points you get for your bet</li>
          <li>You can <strong>only place and change your final cup winner bet until the first match begins</strong></li>
          <li>Bets are made for the final outcome of the game <strong>before a potential penalty shootout (120 minutes)</strong></li>
        </ul>
        <h2 class="h3">Odds</h2>
        <p>
          Odds determine the <strong>amount of points you get for each bet</strong>. If many players place the same bet they get less points. In case only few players place the same bet they are rewarded with more points. Odds only become visible after the match started and no player can change their bet anymore.
        </p>
        <h2 class="h3">Odd calculation</h2>
        <p>
          Odds are calculated according this simple equation:
        </p>
        <p>
          <strong>Odds = total number of players / number of players with same bet</strong>
        </p>
        <p>
          So if you want to get more points, try to place a different bet than the other players. Odds apply to bets on matches as well as the final cup winner.
        </p>
        <h2 class="h3">Example</h2>
        <ul>
          <li>Let's assume there are <strong>50</strong> players in total</li>
          <li><strong>15</strong> players bet on a win for team 1. The odds equal <strong>50 / 15 = 3.33</strong> points</li>
          <li><strong>30</strong> players bet on outcome X (draw). The odds equal <strong>50 / 30 = 1.67</strong> points</li>
          <li><strong>5</strong> players bet on a win for team 2. The odds equal <strong>50 / 5 = 10.00</strong> points</li>
        </ul>
        <p>
          Let's further assume that the match results in a draw after 120 minutes. Team 1 wins after a penalty shootout. This is still counted as draw and the 30 players who bet on draw will each get +1.67 points. All other players will get 0 points.
        </p>
        <p>
          The points for the correct cup winner bet are calculated the same way. So if for example only 2 people guess the final cup winner, they each get 50 / 2 = +25.00 points.
        </p>
        <h2 class="h3">Scores</h2>
        <h2 class="h3 text--cyan">
          <img v-if="iconPaths.length" :src="getURL(0)" class="score-preview__icon" /> Schosel
        </h2>
        <p>
          You earn points from correct bets. For example:
        </p>
        <ul>
          <li>Germany plays Switzerland</li>
          <li>Odds result in Germany 1.50, Draw 2.50, Switzerland 10.00</li>
          <li>You bet on Switzerland</li>
          <li>Switzerland wins</li>
          <li>You get <span class="text--cyan">+10.00</span> points in score <span class="text--cyan">Schosel</span></li>
          <li>You also get <span class="text--purple">+10.00</span> points in score <span class="text--purple">Underdog</span> because less people bet on Switzerland, hence they're considered the Underdog</li>
        </ul>
        <h2 class="h3 text--blue">
          <img v-if="iconPaths.length" :src="getURL(1)" class="score-preview__icon" /> Loser
        </h2>
        <p>
          You earn points from wrong bets. For example:
        </p>
        <ul>
          <li>Germany plays Switzerland</li>
          <li>Odds result in Germany 1.50, Draw 2.50, Switzerland 10.00</li>
          <li>You bet on Germany</li>
          <li>Switzerland wins</li>
          <li>You get <span class="text--blue">+1.50</span> points in score <span class="text--blue">Loser</span></li>
          <li>If you bet on a draw, you would have gotten <span class="text--blue">+2.50</span> points in score <span class="text--blue">Loser</span></li>
        </ul>
        <h2 class="h3">Champion bet outcome</h2>
        <p>
          If you bet on the correct cup winner the points based on odds are added <strong>to your total points in each score</strong>
        </p>
        <strong>Have fun and good luck! :)</strong>
      </div>
    </div>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'rules',
    computed: {
      ...mapGetters([
        'iconPaths',
        'loggedInUser'
      ])
    },
    methods: {
      getURL(index) {
        return require(`../assets/img/icons/${this.iconPaths[index]}`)
      }
    }
  }
</script>
