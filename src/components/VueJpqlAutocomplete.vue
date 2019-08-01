<template>
  <vue-autosuggest 
    ref="autosuggest"
    v-model="query"
    :suggestions="suggestions"
    :input-props="{placeholder: placeholder, class: 'autosuggest' }"
    @input="onInputChange"
    @focus="logEvent"
    @selected="focusInputBox"
    :get-suggestion-value="suggestionSelected">

    <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
    <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </vue-autosuggest>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest'
import SqlWhereParser from 'sql-where-parser'

export default {
  name: 'VueJpqlAutocomplete',
  components: {
    VueAutosuggest
  },
  data: function() {
    return {
      token: '',
      tokens: [],
      tokenType: 0, // 0-field, 1-operator, 2-value, 3-logicalop
      suggestions: [],
      query: '',
      sqlParser: new SqlWhereParser()
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Type query here...'
    },
    operators: {
      type: Array,
      default: function() { return ['=','<>','>','>=','<','<='] },
    },
    fieldSettings: {
      type: Array,
      default: function() { return [
          { name: 'status', values: ['Open','Closed'], type: 'string' },
          { name: 'id', type: 'number' },
          { name: 'description', type: 'string' }
        ]; 
      }
    }
  },
  computed: {
    fieldSuggestions() {
      return this.fieldSettings.map(fs => { return fs.name; }).sort();
    },
    isValid() {
      var parsed = this.query;
      try{
        parsed = this.sqlParser.parse(this.query);
      }
      catch(err) {
        return false;
      }
      var isValid = !parsed || (parsed && typeof parsed !== 'string' && JSON.stringify(parsed).indexOf('null') == -1);
      this.$refs.autosuggest.$el.querySelector('input.autosuggest').setAttribute('aria-invalid', isValid ? 'false' : 'true');
      return isValid;
    }
  },
  methods: {
    logEvent: function(){},
    focusInputBox: function() { this.$refs.autosuggest.$el.querySelector('input.autosuggest').focus(); },
    suggestionSelected: function(val){
      return this.query.replace(new RegExp(this.token + '$'), val.item);
    },
    onInputChange: function(originalVal) {
      this.$emit('input', originalVal);
      var val = originalVal.substring(0, this.$refs.autosuggest.$el.querySelector('input.autosuggest').selectionStart);
      this.token = ''; 
      var i = 0;
      if(val.trimStart().length > 0) {
        val = val.trimStart().replace(this.bracketsRegex,'');
        this.tokens = val.match(this.parser);
        console.log(this.tokens);
        this.token = this.tokens[this.tokens.length-1].trim();
        i = (this.tokens.length - 1)%4;
      }
      switch(i) {
        case 0: this.suggestFields(this.token); break;
        case 1: this.suggestOperators(this.token); break;
        case 2: this.suggestValues(this.token); break;
        case 3: this.suggestLogicalOps(this.token); break;
      }
    },
    suggestFields: function(val) {
      this.suggestions = [{ name: 'Fields', data: this.fieldSuggestions.filter(f => { return f.indexOf(val) > -1; }) }];
    },
    suggestOperators: function(val) {
      val = val.toUpperCase();
      this.suggestions = [{name: 'Operators', data: this.operators.filter(o => { return o.indexOf(val) > -1; }) }];
    },
    suggestValues: function(val) {
      var fieldToken = this.tokens[this.tokens.length - 3].trim();
      var fieldSetting = this.fieldSettings.filter(fs => { return fs.name == fieldToken; })[0];
      this.suggestions = [{name: 'Values', data: fieldSetting.values ? fieldSetting.values.filter(f => { return f.indexOf(val) > -1; }) : [`Provide a ${fieldSetting.type || 'text'} value for searching.`]}];
    },
    suggestLogicalOps: function() {
      this.suggestions = [{name: 'Logical Operators', data:['AND', 'OR']}];
    }
  },
  mounted() {
    this.suggestFields('');
    var regex = '([\\s]+\'[\\w%\\s]+\'?|[\\s]*[\\w]+|[\\s]+' + this.operators.join('?|[\\s]+') + '?)';
    this.parser = new RegExp(regex, 'ig');
  },
  created() {
    this.bracketsRegex = /[()]/g;

  }
}
</script>

