<template>
   <svg class="btn--superbet" width="16" height="15" xmlns="http://www.w3.org/2000/svg">
     <path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z" :fill="fill" :stroke="stroke" fill-rule="evenodd"/>
   </svg>
</template>

<script>
  export default {
    name: 'super-bet',
    props: {
      correct: Boolean
    },
    computed: {
      stroke () {
        return this.correct ? '#FFA24D' : '#625964'
      },
      fill () {
        return this.correct ? '#FFD84D' : '#3A353B'
      },
    }
  }
</script>
