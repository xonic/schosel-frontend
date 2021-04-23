<template>
  <div class="popover">
    <div class="popover__toggle" @click.stop="togglePopover">
      <slot></slot>
    </div>
    <transition name="fade">
      <ul id="popover" v-if="popoverIsVisible" class="popover__list">
        <li class="popover__item" v-for='item in items' :key='item.id'>
          <router-link class="popover__link":to="{ name: item.route }">{{ item.name }}</router-link>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: {
      items: Array
    },
    data () {
      return {
        show: false
      }
    },
    computed: {
      ...mapGetters([
        'popoverIsVisible'
      ])
    },
    methods: {
      togglePopover() {
        if(this.popoverIsVisible) {
          this.$store.dispatch('HIDE_POPOVER')
        }
        else {
          this.$store.dispatch('SHOW_POPOVER')
        }
      }
    }
  }
</script>

<style>

  .popover {
    position: relative;
  }

  .popover__list {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    box-shadow: 0 8px 16px rgba(0,0,0,.25);
    border-radius: 12px;
  }

  .popover__link {
    display: block;
    padding: 12px 24px;
    border-bottom: 0;
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
  }
</style>
