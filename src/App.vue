<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
        state:false
    }
  },
  methods: {

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center !important;
  color: #2c3e50;
}
#app .list-title{
  text-align: center !important;
  margin:.1rem 0 0 0;
}
#app .list-other{
  text-align: center !important;
  margin:.3rem 0 0 0;
  display: block;
  width:100%;
}
#app .list-item{
  padding:5px;
  margin-top: 2px;
}
</style>
