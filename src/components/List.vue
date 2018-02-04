<template>
  <ul>
    <li v-for='item in items' :key='item.id'>
      <slot :name="item.id">{{ item }}</slot>
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
