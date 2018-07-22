<template>
  <div class="score">
    <div class="wrapper">
      <div class="hero hero--2">
        <transition name="hero" appear>
          <div>
            <h1 class="hero__heading">Team Champion Odds</h1>
          </div>
        </transition>
      </div>
      <clip-loader :loading="loading.status" :color="loading.color" :size="loading.size"></clip-loader>
        <div v-if="!loading.status">
          <transition name="content" appear>
            <div>
            <div class="island" v-if="status.teams">
              <grid
                :data="gridData"
                :columns="gridColumns">
              </grid>
            </div>
            <h2 v-else class="blankslate">There are no teams.</h2>
            <div class="island">
              <div class="hero hero--8">
                <transition name="hero" appear>
                  <div>
                    <h1 class="hero__heading">Matches by Correct Bets</h1>
                  </div>
                </transition>
              </div>
              <table border="1" class="dataGrid">
              <thead>
                <tr style="text-align: right;">
                  <th></th>
                  <th>team1</th>
                  <th>team2</th>
                  <th>stage</th>
                  <th>odds_team1</th>
                  <th>odds_draw</th>
                  <th>odds_team2</th>
                  <th>correct_count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>France</td>
                  <td>Australia</td>
                  <td>Group stage</td>
                  <td>1.08750</td>
                  <td>17.40000</td>
                  <td>43.50000</td>
                  <td>80</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Iran</td>
                  <td>Spain</td>
                  <td>Group stage</td>
                  <td>21.75000</td>
                  <td>12.42860</td>
                  <td>1.16000</td>
                  <td>75</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Uruguay</td>
                  <td>Saudi Arabia</td>
                  <td>Group stage</td>
                  <td>1.19178</td>
                  <td>9.66667</td>
                  <td>29.00000</td>
                  <td>73</td>
                </tr>
                <tr>
                  <th>4</th>
                  <td>Belgium</td>
                  <td>Panama</td>
                  <td>Group stage</td>
                  <td>1.20833</td>
                  <td>9.66667</td>
                  <td>14.50000</td>
                  <td>72</td>
                </tr>
                <tr>
                  <th>5</th>
                  <td>Belgium</td>
                  <td>Tunisia</td>
                  <td>Group stage</td>
                  <td>1.20833</td>
                  <td>9.66667</td>
                  <td>21.75000</td>
                  <td>72</td>
                </tr>
                <tr>
                  <th>6</th>
                  <td>Egypt</td>
                  <td>Uruguay</td>
                  <td>Group stage</td>
                  <td>12.42860</td>
                  <td>14.50000</td>
                  <td>1.22535</td>
                  <td>71</td>
                </tr>
                <tr>
                  <th>7</th>
                  <td>Portugal</td>
                  <td>Morocco</td>
                  <td>Group stage</td>
                  <td>1.22535</td>
                  <td>8.70000</td>
                  <td>17.40000</td>
                  <td>71</td>
                </tr>
                <tr>
                  <th>8</th>
                  <td>Russia</td>
                  <td>Saudi Arabia</td>
                  <td>Group stage</td>
                  <td>1.24286</td>
                  <td>7.25000</td>
                  <td>21.75000</td>
                  <td>70</td>
                </tr>
                <tr>
                  <th>9</th>
                  <td>England</td>
                  <td>Panama</td>
                  <td>Group stage</td>
                  <td>1.27941</td>
                  <td>21.75000</td>
                  <td>6.69231</td>
                  <td>68</td>
                </tr>
                <tr>
                  <th>10</th>
                  <td>Brazil</td>
                  <td>Costa Rica</td>
                  <td>Group stage</td>
                  <td>1.29851</td>
                  <td>14.50000</td>
                  <td>10.87500</td>
                  <td>67</td>
                </tr>
                <tr>
                  <th>11</th>
                  <td>Tunisia</td>
                  <td>England</td>
                  <td>Group stage</td>
                  <td>10.87500</td>
                  <td>6.21429</td>
                  <td>1.33846</td>
                  <td>65</td>
                </tr>
                <tr>
                  <th>12</th>
                  <td>France</td>
                  <td>Peru</td>
                  <td>Group stage</td>
                  <td>1.35938</td>
                  <td>7.25000</td>
                  <td>9.66667</td>
                  <td>64</td>
                </tr>
                <tr>
                  <th>13</th>
                  <td>Belgium</td>
                  <td>Japan</td>
                  <td>Round of 16</td>
                  <td>1.47458</td>
                  <td>7.90909</td>
                  <td>9.66667</td>
                  <td>59</td>
                </tr>
                <tr>
                  <th>14</th>
                  <td>South Korea</td>
                  <td>Mexico</td>
                  <td>Group stage</td>
                  <td>9.66667</td>
                  <td>4.83333</td>
                  <td>1.50000</td>
                  <td>58</td>
                </tr>
                <tr>
                  <th>15</th>
                  <td>Croatia</td>
                  <td>Nigeria</td>
                  <td>Group stage</td>
                  <td>1.50000</td>
                  <td>5.43750</td>
                  <td>6.69231</td>
                  <td>58</td>
                </tr>
                <tr>
                  <th>16</th>
                  <td>Nigeria</td>
                  <td>Argentina</td>
                  <td>Group stage</td>
                  <td>6.21429</td>
                  <td>7.25000</td>
                  <td>1.50000</td>
                  <td>58</td>
                </tr>
                <tr>
                  <th>17</th>
                  <td>Germany</td>
                  <td>Sweden</td>
                  <td>Group stage</td>
                  <td>1.70588</td>
                  <td>3.95455</td>
                  <td>6.21429</td>
                  <td>51</td>
                </tr>
                <tr>
                  <th>18</th>
                  <td>Serbia</td>
                  <td>Brazil</td>
                  <td>Group stage</td>
                  <td>4.57895</td>
                  <td>5.43750</td>
                  <td>1.74000</td>
                  <td>50</td>
                </tr>
                <tr>
                  <th>19</th>
                  <td>Senegal</td>
                  <td>Colombia</td>
                  <td>Group stage</td>
                  <td>5.11765</td>
                  <td>4.57895</td>
                  <td>1.85106</td>
                  <td>47</td>
                </tr>
                <tr>
                  <th>20</th>
                  <td>France</td>
                  <td>Argentina</td>
                  <td>Round of 16</td>
                  <td>1.89130</td>
                  <td>6.21429</td>
                  <td>5.80000</td>
                  <td>46</td>
                </tr>
                <tr>
                  <th>21</th>
                  <td>Peru</td>
                  <td>Denmark</td>
                  <td>Group stage</td>
                  <td>4.57895</td>
                  <td>3.62500</td>
                  <td>1.97727</td>
                  <td>44</td>
                </tr>
                <tr>
                  <th>22</th>
                  <td>Brazil</td>
                  <td>Mexico</td>
                  <td>Round of 16</td>
                  <td>2.02326</td>
                  <td>5.11765</td>
                  <td>4.57895</td>
                  <td>43</td>
                </tr>
                <tr>
                  <th>23</th>
                  <td>Belgium</td>
                  <td>England</td>
                  <td>Third place play-off</td>
                  <td>2.12195</td>
                  <td>8.70000</td>
                  <td>7.90909</td>
                  <td>41</td>
                </tr>
                <tr>
                  <th>24</th>
                  <td>Sweden</td>
                  <td>South Korea</td>
                  <td>Group stage</td>
                  <td>2.12195</td>
                  <td>3.00000</td>
                  <td>5.11765</td>
                  <td>41</td>
                </tr>
                <tr>
                  <th>25</th>
                  <td>Sweden</td>
                  <td>England</td>
                  <td>Quarter-finals</td>
                  <td>5.11765</td>
                  <td>4.83333</td>
                  <td>2.17500</td>
                  <td>40</td>
                </tr>
                <tr>
                  <th>26</th>
                  <td>Iceland</td>
                  <td>Croatia</td>
                  <td>Group stage</td>
                  <td>4.35000</td>
                  <td>3.48000</td>
                  <td>2.23077</td>
                  <td>39</td>
                </tr>
                <tr>
                  <th>27</th>
                  <td>Russia</td>
                  <td>Egypt</td>
                  <td>Group stage</td>
                  <td>2.23077</td>
                  <td>3.22222</td>
                  <td>4.14286</td>
                  <td>39</td>
                </tr>
                <tr>
                  <th>28</th>
                  <td>Serbia</td>
                  <td>Switzerland</td>
                  <td>Group stage</td>
                  <td>4.35000</td>
                  <td>3.10714</td>
                  <td>2.28947</td>
                  <td>38</td>
                </tr>
                <tr>
                  <th>29</th>
                  <td>Uruguay</td>
                  <td>France</td>
                  <td>Quarter-finals</td>
                  <td>5.43750</td>
                  <td>4.14286</td>
                  <td>2.41667</td>
                  <td>36</td>
                </tr>
                <tr>
                  <th>30</th>
                  <td>France</td>
                  <td>Croatia</td>
                  <td>Final</td>
                  <td>2.48571</td>
                  <td>9.66667</td>
                  <td>3.78261</td>
                  <td>35</td>
                </tr>
                <tr>
                  <th>31</th>
                  <td>England</td>
                  <td>Belgium</td>
                  <td>Group stage</td>
                  <td>4.35000</td>
                  <td>3.10714</td>
                  <td>2.63636</td>
                  <td>33</td>
                </tr>
                <tr>
                  <th>32</th>
                  <td>Uruguay</td>
                  <td>Russia</td>
                  <td>Group stage</td>
                  <td>2.63636</td>
                  <td>3.48000</td>
                  <td>3.34615</td>
                  <td>33</td>
                </tr>
                <tr>
                  <th>33</th>
                  <td>Costa Rica</td>
                  <td>Serbia</td>
                  <td>Group stage</td>
                  <td>3.78261</td>
                  <td>3.00000</td>
                  <td>2.63636</td>
                  <td>33</td>
                </tr>
                <tr>
                  <th>34</th>
                  <td>Poland</td>
                  <td>Colombia</td>
                  <td>Group stage</td>
                  <td>2.55882</td>
                  <td>4.14286</td>
                  <td>2.80645</td>
                  <td>31</td>
                </tr>
                <tr>
                  <th>35</th>
                  <td>Japan</td>
                  <td>Poland</td>
                  <td>Group stage</td>
                  <td>2.48571</td>
                  <td>4.83333</td>
                  <td>2.80645</td>
                  <td>31</td>
                </tr>
                <tr>
                  <th>36</th>
                  <td>Panama</td>
                  <td>Tunisia</td>
                  <td>Group stage</td>
                  <td>3.78261</td>
                  <td>2.80645</td>
                  <td>2.90000</td>
                  <td>30</td>
                </tr>
                <tr>
                  <th>37</th>
                  <td>Argentina</td>
                  <td>Croatia</td>
                  <td>Group stage</td>
                  <td>2.90000</td>
                  <td>3.48000</td>
                  <td>2.90000</td>
                  <td>30</td>
                </tr>
                <tr>
                  <th>38</th>
                  <td>Brazil</td>
                  <td>Belgium</td>
                  <td>Quarter-finals</td>
                  <td>3.62500</td>
                  <td>3.95455</td>
                  <td>3.10714</td>
                  <td>28</td>
                </tr>
                <tr>
                  <th>39</th>
                  <td>Denmark</td>
                  <td>Australia</td>
                  <td>Group stage</td>
                  <td>2.71875</td>
                  <td>3.10714</td>
                  <td>3.48000</td>
                  <td>28</td>
                </tr>
                <tr>
                  <th>40</th>
                  <td>France</td>
                  <td>Belgium</td>
                  <td>Semi-finals</td>
                  <td>3.22222</td>
                  <td>5.43750</td>
                  <td>2.63636</td>
                  <td>27</td>
                </tr>
                <tr>
                  <th>41</th>
                  <td>Australia</td>
                  <td>Peru</td>
                  <td>Group stage</td>
                  <td>3.00000</td>
                  <td>3.00000</td>
                  <td>3.34615</td>
                  <td>26</td>
                </tr>
                <tr>
                  <th>42</th>
                  <td>Portugal</td>
                  <td>Spain</td>
                  <td>Group stage</td>
                  <td>4.14286</td>
                  <td>3.34615</td>
                  <td>2.23077</td>
                  <td>26</td>
                </tr>
                <tr>
                  <th>43</th>
                  <td>Croatia</td>
                  <td>England</td>
                  <td>Semi-finals</td>
                  <td>3.62500</td>
                  <td>5.43750</td>
                  <td>2.35135</td>
                  <td>24</td>
                </tr>
                <tr>
                  <th>44</th>
                  <td>Mexico</td>
                  <td>Sweden</td>
                  <td>Group stage</td>
                  <td>3.00000</td>
                  <td>2.80645</td>
                  <td>3.78261</td>
                  <td>23</td>
                </tr>
                <tr>
                  <th>45</th>
                  <td>Uruguay</td>
                  <td>Portugal</td>
                  <td>Round of 16</td>
                  <td>3.78261</td>
                  <td>3.95455</td>
                  <td>2.63636</td>
                  <td>23</td>
                </tr>
                <tr>
                  <th>46</th>
                  <td>Sweden</td>
                  <td>Switzerland</td>
                  <td>Round of 16</td>
                  <td>3.95455</td>
                  <td>3.78261</td>
                  <td>2.55882</td>
                  <td>22</td>
                </tr>
                <tr>
                  <th>47</th>
                  <td>Nigeria</td>
                  <td>Iceland</td>
                  <td>Group stage</td>
                  <td>3.95455</td>
                  <td>4.83333</td>
                  <td>1.89130</td>
                  <td>22</td>
                </tr>
                <tr>
                  <th>48</th>
                  <td>Russia</td>
                  <td>Croatia</td>
                  <td>Quarter-finals</td>
                  <td>6.69231</td>
                  <td>4.14286</td>
                  <td>2.07143</td>
                  <td>21</td>
                </tr>
                <tr>
                  <th>49</th>
                  <td>Japan</td>
                  <td>Senegal</td>
                  <td>Group stage</td>
                  <td>3.34615</td>
                  <td>4.35000</td>
                  <td>2.17500</td>
                  <td>20</td>
                </tr>
                <tr>
                  <th>50</th>
                  <td>Switzerland</td>
                  <td>Costa Rica</td>
                  <td>Group stage</td>
                  <td>1.70588</td>
                  <td>4.35000</td>
                  <td>6.21429</td>
                  <td>20</td>
                </tr>
                <tr>
                  <th>51</th>
                  <td>Colombia</td>
                  <td>England</td>
                  <td>Round of 16</td>
                  <td>3.95455</td>
                  <td>5.11765</td>
                  <td>2.17500</td>
                  <td>17</td>
                </tr>
                <tr>
                  <th>52</th>
                  <td>Colombia</td>
                  <td>Japan</td>
                  <td>Group stage</td>
                  <td>1.77551</td>
                  <td>4.35000</td>
                  <td>5.11765</td>
                  <td>17</td>
                </tr>
                <tr>
                  <th>53</th>
                  <td>Poland</td>
                  <td>Senegal</td>
                  <td>Group stage</td>
                  <td>2.02326</td>
                  <td>3.22222</td>
                  <td>5.43750</td>
                  <td>16</td>
                </tr>
                <tr>
                  <th>54</th>
                  <td>Argentina</td>
                  <td>Iceland</td>
                  <td>Group stage</td>
                  <td>1.42623</td>
                  <td>5.43750</td>
                  <td>8.70000</td>
                  <td>16</td>
                </tr>
                <tr>
                  <th>55</th>
                  <td>Iran</td>
                  <td>Portugal</td>
                  <td>Group stage</td>
                  <td>14.50000</td>
                  <td>5.43750</td>
                  <td>1.38095</td>
                  <td>16</td>
                </tr>
                <tr>
                  <th>56</th>
                  <td>Denmark</td>
                  <td>France</td>
                  <td>Group stage</td>
                  <td>7.25000</td>
                  <td>5.43750</td>
                  <td>1.58182</td>
                  <td>16</td>
                </tr>
                <tr>
                  <th>57</th>
                  <td>Spain</td>
                  <td>Russia</td>
                  <td>Round of 16</td>
                  <td>1.85106</td>
                  <td>6.69231</td>
                  <td>4.83333</td>
                  <td>13</td>
                </tr>
                <tr>
                  <th>58</th>
                  <td>Brazil</td>
                  <td>Switzerland</td>
                  <td>Group stage</td>
                  <td>1.33846</td>
                  <td>6.69231</td>
                  <td>9.66667</td>
                  <td>13</td>
                </tr>
                <tr>
                  <th>59</th>
                  <td>Morocco</td>
                  <td>Iran</td>
                  <td>Group stage</td>
                  <td>2.41667</td>
                  <td>2.28947</td>
                  <td>7.25000</td>
                  <td>12</td>
                </tr>
                <tr>
                  <th>60</th>
                  <td>Croatia</td>
                  <td>Denmark</td>
                  <td>Round of 16</td>
                  <td>1.64151</td>
                  <td>7.25000</td>
                  <td>6.69231</td>
                  <td>12</td>
                </tr>
                <tr>
                  <th>61</th>
                  <td>Saudi Arabia</td>
                  <td>Egypt</td>
                  <td>Group stage</td>
                  <td>7.90909</td>
                  <td>5.80000</td>
                  <td>1.50000</td>
                  <td>11</td>
                </tr>
                <tr>
                  <th>62</th>
                  <td>South Korea</td>
                  <td>Germany</td>
                  <td>Group stage</td>
                  <td>12.42860</td>
                  <td>7.25000</td>
                  <td>1.35938</td>
                  <td>7</td>
                </tr>
                <tr>
                  <th>63</th>
                  <td>Germany</td>
                  <td>Mexico</td>
                  <td>Group stage</td>
                  <td>1.40323</td>
                  <td>5.11765</td>
                  <td>14.50000</td>
                  <td>6</td>
                </tr>
                <tr>
                  <th>64</th>
                  <td>Spain</td>
                  <td>Morocco</td>
                  <td>Group stage</td>
                  <td>1.17568</td>
                  <td>17.40000</td>
                  <td>17.40000</td>
                  <td>5</td>
                </tr>
              </tbody>
            </table>
            </div>
            <div class="island">
              <div class="hero hero--1">
                <transition name="hero" appear>
                  <div>
                    <h1 class="hero__heading">Matches by Odds</h1>
                  </div>
                </transition>
              </div>
              <table border="1" class="dataGrid">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>team1</th>
                    <th>team2</th>
                    <th>stage</th>
                    <th>odds_team1</th>
                    <th>odds_draw</th>
                    <th>odds_team2</th>
                    <th>sum_odds</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>France</td>
                    <td>Australia</td>
                    <td>Group stage</td>
                    <td>1.08750</td>
                    <td>17.40000</td>
                    <td>43.50000</td>
                    <td>61.98750</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>Uruguay</td>
                    <td>Saudi Arabia</td>
                    <td>Group stage</td>
                    <td>1.19178</td>
                    <td>9.66667</td>
                    <td>29.00000</td>
                    <td>39.85845</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Spain</td>
                    <td>Morocco</td>
                    <td>Group stage</td>
                    <td>1.17568</td>
                    <td>17.40000</td>
                    <td>17.40000</td>
                    <td>35.97568</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>Iran</td>
                    <td>Spain</td>
                    <td>Group stage</td>
                    <td>21.75000</td>
                    <td>12.42860</td>
                    <td>1.16000</td>
                    <td>35.33860</td>
                  </tr>
                  <tr>
                    <th>5</th>
                    <td>Belgium</td>
                    <td>Tunisia</td>
                    <td>Group stage</td>
                    <td>1.20833</td>
                    <td>9.66667</td>
                    <td>21.75000</td>
                    <td>32.62500</td>
                  </tr>
                  <tr>
                    <th>6</th>
                    <td>Russia</td>
                    <td>Saudi Arabia</td>
                    <td>Group stage</td>
                    <td>1.24286</td>
                    <td>7.25000</td>
                    <td>21.75000</td>
                    <td>30.24286</td>
                  </tr>
                  <tr>
                    <th>7</th>
                    <td>England</td>
                    <td>Panama</td>
                    <td>Group stage</td>
                    <td>1.27941</td>
                    <td>21.75000</td>
                    <td>6.69231</td>
                    <td>29.72172</td>
                  </tr>
                  <tr>
                    <th>8</th>
                    <td>Egypt</td>
                    <td>Uruguay</td>
                    <td>Group stage</td>
                    <td>12.42860</td>
                    <td>14.50000</td>
                    <td>1.22535</td>
                    <td>28.15395</td>
                  </tr>
                  <tr>
                    <th>9</th>
                    <td>Portugal</td>
                    <td>Morocco</td>
                    <td>Group stage</td>
                    <td>1.22535</td>
                    <td>8.70000</td>
                    <td>17.40000</td>
                    <td>27.32535</td>
                  </tr>
                  <tr>
                    <th>10</th>
                    <td>Brazil</td>
                    <td>Costa Rica</td>
                    <td>Group stage</td>
                    <td>1.29851</td>
                    <td>14.50000</td>
                    <td>10.87500</td>
                    <td>26.67351</td>
                  </tr>
                  <tr>
                    <th>11</th>
                    <td>Belgium</td>
                    <td>Panama</td>
                    <td>Group stage</td>
                    <td>1.20833</td>
                    <td>9.66667</td>
                    <td>14.50000</td>
                    <td>25.37500</td>
                  </tr>
                  <tr>
                    <th>12</th>
                    <td>Iran</td>
                    <td>Portugal</td>
                    <td>Group stage</td>
                    <td>14.50000</td>
                    <td>5.43750</td>
                    <td>1.38095</td>
                    <td>21.31845</td>
                  </tr>
                  <tr>
                    <th>13</th>
                    <td>South Korea</td>
                    <td>Germany</td>
                    <td>Group stage</td>
                    <td>12.42860</td>
                    <td>7.25000</td>
                    <td>1.35938</td>
                    <td>21.03798</td>
                  </tr>
                  <tr>
                    <th>14</th>
                    <td>Germany</td>
                    <td>Mexico</td>
                    <td>Group stage</td>
                    <td>1.40323</td>
                    <td>5.11765</td>
                    <td>14.50000</td>
                    <td>21.02088</td>
                  </tr>
                  <tr>
                    <th>15</th>
                    <td>Belgium</td>
                    <td>Japan</td>
                    <td>Round of 16</td>
                    <td>1.47458</td>
                    <td>7.90909</td>
                    <td>9.66667</td>
                    <td>19.05034</td>
                  </tr>
                  <tr>
                    <th>16</th>
                    <td>Belgium</td>
                    <td>England</td>
                    <td>Third place play-off</td>
                    <td>2.12195</td>
                    <td>8.70000</td>
                    <td>7.90909</td>
                    <td>18.73104</td>
                  </tr>
                  <tr>
                    <th>17</th>
                    <td>Tunisia</td>
                    <td>England</td>
                    <td>Group stage</td>
                    <td>10.87500</td>
                    <td>6.21429</td>
                    <td>1.33846</td>
                    <td>18.42775</td>
                  </tr>
                  <tr>
                    <th>18</th>
                    <td>France</td>
                    <td>Peru</td>
                    <td>Group stage</td>
                    <td>1.35938</td>
                    <td>7.25000</td>
                    <td>9.66667</td>
                    <td>18.27605</td>
                  </tr>
                  <tr>
                    <th>19</th>
                    <td>Brazil</td>
                    <td>Switzerland</td>
                    <td>Group stage</td>
                    <td>1.33846</td>
                    <td>6.69231</td>
                    <td>9.66667</td>
                    <td>17.69744</td>
                  </tr>
                  <tr>
                    <th>20</th>
                    <td>South Korea</td>
                    <td>Mexico</td>
                    <td>Group stage</td>
                    <td>9.66667</td>
                    <td>4.83333</td>
                    <td>1.50000</td>
                    <td>16.00000</td>
                  </tr>
                  <tr>
                    <th>21</th>
                    <td>France</td>
                    <td>Croatia</td>
                    <td>Final</td>
                    <td>2.48571</td>
                    <td>9.66667</td>
                    <td>3.78261</td>
                    <td>15.93499</td>
                  </tr>
                  <tr>
                    <th>22</th>
                    <td>Croatia</td>
                    <td>Denmark</td>
                    <td>Round of 16</td>
                    <td>1.64151</td>
                    <td>7.25000</td>
                    <td>6.69231</td>
                    <td>15.58382</td>
                  </tr>
                  <tr>
                    <th>23</th>
                    <td>Argentina</td>
                    <td>Iceland</td>
                    <td>Group stage</td>
                    <td>1.42623</td>
                    <td>5.43750</td>
                    <td>8.70000</td>
                    <td>15.56373</td>
                  </tr>
                  <tr>
                    <th>24</th>
                    <td>Saudi Arabia</td>
                    <td>Egypt</td>
                    <td>Group stage</td>
                    <td>7.90909</td>
                    <td>5.80000</td>
                    <td>1.50000</td>
                    <td>15.20909</td>
                  </tr>
                  <tr>
                    <th>25</th>
                    <td>Nigeria</td>
                    <td>Argentina</td>
                    <td>Group stage</td>
                    <td>6.21429</td>
                    <td>7.25000</td>
                    <td>1.50000</td>
                    <td>14.96429</td>
                  </tr>
                  <tr>
                    <th>26</th>
                    <td>Denmark</td>
                    <td>France</td>
                    <td>Group stage</td>
                    <td>7.25000</td>
                    <td>5.43750</td>
                    <td>1.58182</td>
                    <td>14.26932</td>
                  </tr>
                  <tr>
                    <th>27</th>
                    <td>France</td>
                    <td>Argentina</td>
                    <td>Round of 16</td>
                    <td>1.89130</td>
                    <td>6.21429</td>
                    <td>5.80000</td>
                    <td>13.90559</td>
                  </tr>
                  <tr>
                    <th>28</th>
                    <td>Croatia</td>
                    <td>Nigeria</td>
                    <td>Group stage</td>
                    <td>1.50000</td>
                    <td>5.43750</td>
                    <td>6.69231</td>
                    <td>13.62981</td>
                  </tr>
                  <tr>
                    <th>29</th>
                    <td>Spain</td>
                    <td>Russia</td>
                    <td>Round of 16</td>
                    <td>1.85106</td>
                    <td>6.69231</td>
                    <td>4.83333</td>
                    <td>13.37670</td>
                  </tr>
                  <tr>
                    <th>30</th>
                    <td>Russia</td>
                    <td>Croatia</td>
                    <td>Quarter-finals</td>
                    <td>6.69231</td>
                    <td>4.14286</td>
                    <td>2.07143</td>
                    <td>12.90660</td>
                  </tr>
                  <tr>
                    <th>31</th>
                    <td>Switzerland</td>
                    <td>Costa Rica</td>
                    <td>Group stage</td>
                    <td>1.70588</td>
                    <td>4.35000</td>
                    <td>6.21429</td>
                    <td>12.27017</td>
                  </tr>
                  <tr>
                    <th>32</th>
                    <td>Sweden</td>
                    <td>England</td>
                    <td>Quarter-finals</td>
                    <td>5.11765</td>
                    <td>4.83333</td>
                    <td>2.17500</td>
                    <td>12.12598</td>
                  </tr>
                  <tr>
                    <th>33</th>
                    <td>Uruguay</td>
                    <td>France</td>
                    <td>Quarter-finals</td>
                    <td>5.43750</td>
                    <td>4.14286</td>
                    <td>2.41667</td>
                    <td>11.99703</td>
                  </tr>
                  <tr>
                    <th>34</th>
                    <td>Morocco</td>
                    <td>Iran</td>
                    <td>Group stage</td>
                    <td>2.41667</td>
                    <td>2.28947</td>
                    <td>7.25000</td>
                    <td>11.95614</td>
                  </tr>
                  <tr>
                    <th>35</th>
                    <td>Germany</td>
                    <td>Sweden</td>
                    <td>Group stage</td>
                    <td>1.70588</td>
                    <td>3.95455</td>
                    <td>6.21429</td>
                    <td>11.87472</td>
                  </tr>
                  <tr>
                    <th>36</th>
                    <td>Serbia</td>
                    <td>Brazil</td>
                    <td>Group stage</td>
                    <td>4.57895</td>
                    <td>5.43750</td>
                    <td>1.74000</td>
                    <td>11.75645</td>
                  </tr>
                  <tr>
                    <th>37</th>
                    <td>Brazil</td>
                    <td>Mexico</td>
                    <td>Round of 16</td>
                    <td>2.02326</td>
                    <td>5.11765</td>
                    <td>4.57895</td>
                    <td>11.71986</td>
                  </tr>
                  <tr>
                    <th>38</th>
                    <td>Senegal</td>
                    <td>Colombia</td>
                    <td>Group stage</td>
                    <td>5.11765</td>
                    <td>4.57895</td>
                    <td>1.85106</td>
                    <td>11.54766</td>
                  </tr>
                  <tr>
                    <th>39</th>
                    <td>Croatia</td>
                    <td>England</td>
                    <td>Semi-finals</td>
                    <td>3.62500</td>
                    <td>5.43750</td>
                    <td>2.35135</td>
                    <td>11.41385</td>
                  </tr>
                  <tr>
                    <th>40</th>
                    <td>France</td>
                    <td>Belgium</td>
                    <td>Semi-finals</td>
                    <td>3.22222</td>
                    <td>5.43750</td>
                    <td>2.63636</td>
                    <td>11.29608</td>
                  </tr>
                  <tr>
                    <th>41</th>
                    <td>Colombia</td>
                    <td>England</td>
                    <td>Round of 16</td>
                    <td>3.95455</td>
                    <td>5.11765</td>
                    <td>2.17500</td>
                    <td>11.24720</td>
                  </tr>
                  <tr>
                    <th>42</th>
                    <td>Colombia</td>
                    <td>Japan</td>
                    <td>Group stage</td>
                    <td>1.77551</td>
                    <td>4.35000</td>
                    <td>5.11765</td>
                    <td>11.24316</td>
                  </tr>
                  <tr>
                    <th>43</th>
                    <td>Brazil</td>
                    <td>Belgium</td>
                    <td>Quarter-finals</td>
                    <td>3.62500</td>
                    <td>3.95455</td>
                    <td>3.10714</td>
                    <td>10.68669</td>
                  </tr>
                  <tr>
                    <th>44</th>
                    <td>Poland</td>
                    <td>Senegal</td>
                    <td>Group stage</td>
                    <td>2.02326</td>
                    <td>3.22222</td>
                    <td>5.43750</td>
                    <td>10.68298</td>
                  </tr>
                  <tr>
                    <th>45</th>
                    <td>Nigeria</td>
                    <td>Iceland</td>
                    <td>Group stage</td>
                    <td>3.95455</td>
                    <td>4.83333</td>
                    <td>1.89130</td>
                    <td>10.67918</td>
                  </tr>
                  <tr>
                    <th>46</th>
                    <td>Uruguay</td>
                    <td>Portugal</td>
                    <td>Round of 16</td>
                    <td>3.78261</td>
                    <td>3.95455</td>
                    <td>2.63636</td>
                    <td>10.37352</td>
                  </tr>
                  <tr>
                    <th>47</th>
                    <td>Sweden</td>
                    <td>Switzerland</td>
                    <td>Round of 16</td>
                    <td>3.95455</td>
                    <td>3.78261</td>
                    <td>2.55882</td>
                    <td>10.29598</td>
                  </tr>
                  <tr>
                    <th>48</th>
                    <td>Sweden</td>
                    <td>South Korea</td>
                    <td>Group stage</td>
                    <td>2.12195</td>
                    <td>3.00000</td>
                    <td>5.11765</td>
                    <td>10.23960</td>
                  </tr>
                  <tr>
                    <th>49</th>
                    <td>Peru</td>
                    <td>Denmark</td>
                    <td>Group stage</td>
                    <td>4.57895</td>
                    <td>3.62500</td>
                    <td>1.97727</td>
                    <td>10.18122</td>
                  </tr>
                  <tr>
                    <th>50</th>
                    <td>Japan</td>
                    <td>Poland</td>
                    <td>Group stage</td>
                    <td>2.48571</td>
                    <td>4.83333</td>
                    <td>2.80645</td>
                    <td>10.12549</td>
                  </tr>
                  <tr>
                    <th>51</th>
                    <td>England</td>
                    <td>Belgium</td>
                    <td>Group stage</td>
                    <td>4.35000</td>
                    <td>3.10714</td>
                    <td>2.63636</td>
                    <td>10.09350</td>
                  </tr>
                  <tr>
                    <th>52</th>
                    <td>Iceland</td>
                    <td>Croatia</td>
                    <td>Group stage</td>
                    <td>4.35000</td>
                    <td>3.48000</td>
                    <td>2.23077</td>
                    <td>10.06077</td>
                  </tr>
                  <tr>
                    <th>53</th>
                    <td>Japan</td>
                    <td>Senegal</td>
                    <td>Group stage</td>
                    <td>3.34615</td>
                    <td>4.35000</td>
                    <td>2.17500</td>
                    <td>9.87115</td>
                  </tr>
                  <tr>
                    <th>54</th>
                    <td>Serbia</td>
                    <td>Switzerland</td>
                    <td>Group stage</td>
                    <td>4.35000</td>
                    <td>3.10714</td>
                    <td>2.28947</td>
                    <td>9.74661</td>
                  </tr>
                  <tr>
                    <th>55</th>
                    <td>Portugal</td>
                    <td>Spain</td>
                    <td>Group stage</td>
                    <td>4.14286</td>
                    <td>3.34615</td>
                    <td>2.23077</td>
                    <td>9.71978</td>
                  </tr>
                  <tr>
                    <th>56</th>
                    <td>Russia</td>
                    <td>Egypt</td>
                    <td>Group stage</td>
                    <td>2.23077</td>
                    <td>3.22222</td>
                    <td>4.14286</td>
                    <td>9.59585</td>
                  </tr>
                  <tr>
                    <th>57</th>
                    <td>Mexico</td>
                    <td>Sweden</td>
                    <td>Group stage</td>
                    <td>3.00000</td>
                    <td>2.80645</td>
                    <td>3.78261</td>
                    <td>9.58906</td>
                  </tr>
                  <tr>
                    <th>58</th>
                    <td>Poland</td>
                    <td>Colombia</td>
                    <td>Group stage</td>
                    <td>2.55882</td>
                    <td>4.14286</td>
                    <td>2.80645</td>
                    <td>9.50813</td>
                  </tr>
                  <tr>
                    <th>59</th>
                    <td>Panama</td>
                    <td>Tunisia</td>
                    <td>Group stage</td>
                    <td>3.78261</td>
                    <td>2.80645</td>
                    <td>2.90000</td>
                    <td>9.48906</td>
                  </tr>
                  <tr>
                    <th>60</th>
                    <td>Uruguay</td>
                    <td>Russia</td>
                    <td>Group stage</td>
                    <td>2.63636</td>
                    <td>3.48000</td>
                    <td>3.34615</td>
                    <td>9.46251</td>
                  </tr>
                  <tr>
                    <th>61</th>
                    <td>Costa Rica</td>
                    <td>Serbia</td>
                    <td>Group stage</td>
                    <td>3.78261</td>
                    <td>3.00000</td>
                    <td>2.63636</td>
                    <td>9.41897</td>
                  </tr>
                  <tr>
                    <th>62</th>
                    <td>Australia</td>
                    <td>Peru</td>
                    <td>Group stage</td>
                    <td>3.00000</td>
                    <td>3.00000</td>
                    <td>3.34615</td>
                    <td>9.34615</td>
                  </tr>
                  <tr>
                    <th>63</th>
                    <td>Denmark</td>
                    <td>Australia</td>
                    <td>Group stage</td>
                    <td>2.71875</td>
                    <td>3.10714</td>
                    <td>3.48000</td>
                    <td>9.30589</td>
                  </tr>
                  <tr>
                    <th>64</th>
                    <td>Argentina</td>
                    <td>Croatia</td>
                    <td>Group stage</td>
                    <td>2.90000</td>
                    <td>3.48000</td>
                    <td>2.90000</td>
                    <td>9.28000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Grid from '@/components/Grid.vue'
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'stats',
  computed: {
    ...mapGetters([
      'status',
      'loading'
    ]),
    gridData () {
      if(this.status.teams) {
        return this.status.teams.sort((a, b) => {
          return b.odds - a.odds
        })
      }
    }
  },
  components: {
    Grid,
    ClipLoader
  },
  data () {
    return {
      gridColumns: ['name', 'group', 'odds']
    }
  }
}
</script>
