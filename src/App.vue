<template>
  <div id="app">
    <h1> LKMX - Front-end </h1>
    <ToDoList/>
  </div>
</template>

<script>
import ToDoList from './components/ToDoList/ToDoList.vue';

export default {
  name: 'App',
  components: {
    ToDoList
  }
}
</script>

<style lang="scss">
  @import '/styles/main.scss'
</style>
