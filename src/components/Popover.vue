<template>
  <div class="popover">
    <div class="popover__toggle" @click="show = !show">
      <slot></slot>
    </div>
    <transition name="fade">
      <ul v-if="show" class="popover__list">
        <li class="popover__item" v-for='item in items' :key='item.id'>
          <router-link class="popover__link":to="{ name: item.route }">{{ item.name }}</router-link>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      items: Array
    },
    data () {
      return {
        show: false
      }
    }
  }
</script>

<style>
/*
  .popover {
    position: relative;
  }

  .popover__list {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    box-shadow: 0 4px 8px rgba(0,0,0,.2);
    border-radius: 12px;
  }

  .popover__link {
    display: block;
    padding: 12px 24px;
    color: black;
  }

  .fade-enter {
    opacity: 0;
    transform: translateY(-4px);
  }

  .fade-enter-active {
    transition: .15s ease-out;
  }

  .fade-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-leave {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-leave-active {
    transition: .075s ease-out;
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
  } */
</style>
