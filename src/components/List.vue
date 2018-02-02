<template>
  <ul>
    <li v-for='item in items' :key='item.id'>
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: Array
  }
}
</script>
