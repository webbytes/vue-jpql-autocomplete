<template>
  <div id="app">
    Simple auto complete:
    <vue-jpql-autocomplete :field-settings="fieldSettings"/>
    <br /><br />
    Auto complete with more options and slots:
    <vue-jpql-autocomplete 
      ref="autocomplete"
      v-model="query"
      placeholder="enter query here..." 
      :field-settings="fieldSettings"
      :operators="['=','<>','>','>=','<','<=']">
      <template v-slot="{suggestion}">
        {{suggestion.name}}: {{suggestion.item}}
      </template>
    </vue-jpql-autocomplete>
    <template v-if="query">
      The query typed is {{ query }} which is {{ $refs.autocomplete.isValid ? 'valid' : 'invalid' }}.
    </template>
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
      query: '',
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
div, .autosuggest, .autosuggest__results-container {
  width: 100%;
}
.autosuggest > input:invalid, input.autosuggest[aria-invalid="true"] {
  border-color: red;
}
.autosuggest__results {
  margin: 0;
  position: absolute;
  z-index: 10000001;
  width: calc(100% - 20px);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 0;
  border: silver solid 1px;
  background: white;
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
