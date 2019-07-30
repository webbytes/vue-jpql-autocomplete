<template>
  <div id="app">
    <vue-jpql-autocomplete 
      ref="autocomplete"
      placeholder="enter query here..." 
      :field-settings="fieldSettings"
      :operators="['=','<>','>','>=','<','<=']">

      <template v-slot="{suggestion}">
        option: {{suggestion.item}}
      </template>
      <template v-slot:before-input>
        JPQL Serach box:
      </template>
      <template v-slot:after-input>
        The query typed is {{ $refs.autocomplete.query }} which is {{ $refs.autocomplete.isValid ? 'valid' : 'invalid' }}.
      </template>
    </vue-jpql-autocomplete>
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
</style>
