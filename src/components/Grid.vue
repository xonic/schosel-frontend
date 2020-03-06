<template>
  <table class="dataGrid">
   <thead>
     <tr>
       <th v-for="key in columns"
         :key="key.id"
         :class="{ active: sortKey == key }">
         {{ key | capitalize }}
         <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
         </span>
       </th>
     </tr>
   </thead>
   <tbody>
     <tr v-for="entry in filteredData"
       :key="entry.id">
       <td v-for="key in columns"
         :key="key.id">
         <router-link :to="{ name: linkToComponent, params: { id: entry[idKey] } }" v-if="hasLinks">
           <div v-if="key === 'name'">
             <img class="avatar avatar--small" :src="entry['avatar']" />
             <span class="name" style="margin-left:16px;">{{ entry[key] }}</span>
           </div>
           <div v-else>
             <div v-if="key === 'superbet'">
               <super-bet :correct="entry[key] === 'correct' ? true : false" />
             </div>
             <div v-else>
              {{ entry[key] }}
             </div>
           </div>
          </router-link>
          <span v-else>
            {{ entry[key] }}
          </span>
       </td>
     </tr>
   </tbody>
 </table>
</template>

<script>
import SuperBet from '@/components/SuperBet'

export default {
  props: {
    data: Array,
    columns: Array,
    filterKey: String,
    hasLinks: Boolean,
    linkToComponent: String,
    idKey: String
  },
  components: {
    SuperBet
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      // console.log(data)
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
}
</script>
