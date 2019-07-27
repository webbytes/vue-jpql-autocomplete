<template>
  <div id="app">
    <vue-jpql-autocomplete 
      placeholder="enter query here..." 
      :field-settings="fieldSettings"
      :operators="['=','<>','>','>=','<','<=','LIKE','IN']"/>
  </div>
</template>

<script>
import VueJpqlAutocomplete from './components/VueJpqlAutocomplete.vue'

export default {
  name: 'app',
  components: {
    VueJpqlAutocomplete
  },
  data: function() {
    return {
      fieldSettings: [
        { name: 'status', values: ['Open','Closed'], type: 'string' },
        { name: 'id', type: 'number' },
        { name: 'description', type: 'string' }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.autosuggest {
  width: 100%;
}
.autosuggest__results {
  margin: 0;
  position: absolute;
  z-index: 10000001;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 0;
  overflow: scroll;
  max-height: 400px;
}
.autosuggest__results ul {
  padding-inline-start: 10px;
}
.autosuggest__results ul li {
  list-style: none;
  display: block;
  text-align: left;
}
</style>
