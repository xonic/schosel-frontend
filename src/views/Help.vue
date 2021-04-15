<template>
  <main>
    <div class="wrapper" v-if="loggedInUser">
      <div v-if="loggedInUser.admin">
        <h1 class="h2 main__title">Help</h1>
        <h2>Payment</h2>
        <p>
          The participation fee for the whole tournament is <strong>10 EUR / 12 CHF</strong>. After registration you'll get an email from <a href="mailto:info@schosel.net">info@schosel.net</a> containing the bank transfer payment instructions.
        </p>

        <p>
          Every registered player <strong>will be disqualified</strong> if their participation fee is not transferred to the Schosel bank account <strong>before the first match begins</strong>.
        </p>

        <h2>Price Money</h2>
        <p>
          The pot equals the sum of all players participation fees. It will be fully paid out to the best players. If you bet on the right outcome of matches and the final cup winner you collect points. If you make it to the top 3 of the score list you win some cash. Here's what's in for you:
        </p>


    1. First place **50%** of the pot
    2. Second place **20%** of the pot
    3. Third place **10%** of the pot
    4. For each achievement (you can win 5) you get **4%** of the pot

  So if you land on first place and win three additional achievements, you get 62% of the pot. Assuming there are 50 players that would make you 310€ richer!

  ---

  ## Betting
  You bet on the outcome of **all 64 world cup matches** as well as on the final cup winner. For each correct bet you collect points based on automatically calculated odds.

  * **During the whole tournament** you can place **8 super bets** which double the points you get if your bet is correct.
  * You can **only place and change your final cup winner bet until the first match begins**.
  * Match bets on the match outcome (Team 1 wins/Draw/Team 2 wins) can be placed and changed until the match itself begins.
  * Bets are made for the final outcome of the game **before a potential penalty shootout**.

  ---

  ## Odds
  Odds determine the **amount of points you get for each correct bet**. If many players place the same bet they get less points. In case only few players place the same bet they are rewarded with more points. Odds only become visible after the match started and no player can change their bet anymore.

  ### Odd calculation
  Odds are calculated according this simple equation:

  **Odds = total number of players / number of players with same bet**

  So if you want to get more points, try to place a different bet than the other players. Odds apply to bets on matches as well as the final cup winner.

  ### Example

  * Let's assume there are **50** players in total.
  * **15** players bet on a win for team 1. The odds equal **50 / 15 = 3.33** points.
  * **30** players bet on outcome X (draw). The odds equal **50 / 30 = 1.67** points.
  * **5** players bet on a win for team 2. The odds equal **50 / 5 = 10** points.

  Let's further assume that the match results in a draw after 120 minutes. Team 1 wins after a penalty shootout. This is still counted as draw and the 30 players who bet on draw will each get 1.67 points. All other players will get 0 points.

  The points for the correct cup winner bet are calculated the same way. So if for example only 2 people guess the final cup winner, they each get 50 / 2 = 25 points.

  ---

  ## Goals
  In the past players often stopped betting during later cup stages when they realised they couldn't get to the first three ranks in the score table anymore. This is why we decided to introduce goals that you can win even if you have a low overall score. You compete with the other players for the highest rank of each goal. If you end first on the ranking of a goal at the end of the cup you win 4% of the pot. In case multiple players score the same amount of points for a goal they split the 4%.

  ### Gambler
  Player with most correct bets on highest odds of matches wins this goal.
  For example:

  * Germany plays Saudi Arabia
  * Odds result in Germany 1.5, Draw 2.5, Saudi Arabia 10
  * You bet on Saudi Arabia
  * Saudi Arabia wins
  * You get one gambler achievement point
  * At the end of the tournament the player with most gambler points wins the goal (4% of pot)

  ### Hustler
  Player who scores the most points through super bets wins this goal.
  For example:

  * Russia plays Uruguay
  * Odds result in Russia 2.5, Draw 5.0, Uruguay 6.0
  * You place a superbet on Uruguay
  * Uruguay wins
  * You get 6.0 * 2 = 12.0 hustler points
  * At the end of the tournament the player with most hustler points wins the goal (4% of pot)

  ### Expert
  Player with most correct bets for one country wins this goal.
  For example:

  * Russia plays Uruguay
  * Odds result in Russia 2.5, Draw 5.0, Uruguay 6.0
  * You bet on Uruguay (which implies that Russia loses)
    - If Uruguay wins (and Russia loses) you get 6.0 expert point for Uruguay and 2.5 for Russia
    - If Russia wins (and Uruguay loses) you get 0 expert points
    - If they draw you get 0 expert points

  ### Hattrick
  Players get points whenever they score 3+ times in a row. Player with most points wins this goal.
  For example:

  * 1st match you bet correctly: +0 pts
  * 2nd match you bet correctly: +0 pts
  * 3rd match you bet correctly: +1 pts
  * 4th match you bet correctly: +2 pts
  * 5th match you bet wrong: +0 pts
  * 6th match you bet correctly: +0 pts
  * 7th match you bet correctly: +0 pts
  * 8th match you bet correctly: +1 pts
  * 9th match you bet correctly: +2 pts
  * 10th match you bet correctly: +3 pts
  * 11th match you bet correctly: +4 pts
  * 12th match you bet correctly: +5 pts

  You have collected 18 chief hattrick points.

  ### Secret
  There is one secret goal that will be revealed after the final match. Until then players can only see their ranking for this goal but they don't know how it's calculated. The organizers of Schosel know the goal and are therefore excluded so they can't win this goal.

  ---

  ## Community
  If you have specific questions regarding Schosel or you simply like to be in touch with other Schosel players to chat and discuss the game, feel free to join our [WhatsApp group chat](https://chat.whatsapp.com/50I08RtgO1LJnDdXetLmL0).

  ---

  **Have fun and good luck! :)**
      </div>
      <div v-else class="blankslate">
        <div class="blankslate__avatar">
          <avatar :src="avatarUrl + Math.random()" size="xlarge" />
        </div>
        <div class="blankslate__text">Here be rules soon</div>
      </div>
    </div>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Avatar from '@/components/Avatar'

  export default {
    name: 'help',
    components: {
      Avatar
    },
    computed: {
      ...mapGetters([
        'loggedInUser',
        'avatarUrl'
      ])
    }
  }
</script>
