<template>
  <div class="tab-grid">
     <div class="tabs">
       <ul class="tab__items wrapper">
         <li v-for="tab in tabs" :key="tab.id" :class="{ 'is-active': tab.isActive }">
           <a class="tab__link" :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
         </li>
       </ul>
     </div>
     <div class="tabs-details">
       <slot></slot>
     </div>
   </div>
</template>

<script>
export default {

  data () {
    return { tabs: [] }
  },

  created () {
    this.tabs = this.$children
  },

  methods: {
    selectTab (selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = (tab.href === selectedTab.href)
      })
    }
  }
}
</script>
