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
          { name: 'status', values: ['Open','Closed'], type: 'text' },
          { name: 'id', type: 'number' },
          { name: 'description', type: 'text' }
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
    focusInputBox: function() { 
      this.searchBox.focus();
      this.onInputChange(this.query, this.query.length);
    },
    suggestionSelected: function(val){
      var token = this.token;
      if(this.tokens['operator2'] && this.tokens['operator2'].trim().toUpperCase() == 'IN') {
        var selectedValues = token.replace(/[[\]]/ig,'').split(',').map(v => { return v.replace(/'/g,'').trim(); });
        token = selectedValues.length > 0 ? selectedValues[selectedValues.length - 1] : '';
      }
      this.query = this.query
                  .substring(0, this.searchBox.selectionStart)
                  .replace(new RegExp(token + '$'), val.item) +
              this.query.substring(this.searchBox.selectionStart);
      this.token = val.item;
      return this.query;
    },
    onInputChange: function(originalVal, cursorPosition) {
      this.$emit('input', originalVal);
      var val = originalVal
                  .substring(0, cursorPosition || this.searchBox.selectionStart)
                  .trimStart();
      this.token = ''; 
      this.tokenType = 'field';
      if(val.length > 0) {
        val = ' ' + val
                      .replace(this.multiSpaceRegex, ' ')
                      .replace(this.inBracketRegex, 'IN [$1]')
                      .replace(this.bracketsRegex,'')
                      .replace(this.multiSpaceRegex, ' ');
        this.tokens = (new RegExp(this.regex, 'ig')).exec(val);

        if(!this.tokens) return;
        this.tokens = this.tokens.groups;
        var tokenTypes = ['logicalop','values','operator','field'];
        for(var g = 0; g < tokenTypes.length; g++) {
          var group = tokenTypes[g];
          this.token = this.tokens[group + '3'] || this.tokens[group + '2'] || this.tokens[group + '1'] || this.tokens[group];
          if(this.token) {
            this.tokenType = group;
            this.token = this.token.trim();
            break;
          }
        }
      }
      switch(this.tokenType) {
        case 'field': this.suggestFields(this.token); break;
        case 'operator': this.suggestOperators(this.token); break;
        case 'values': this.suggestValues(this.token); break;
        case 'logicalop': this.suggestLogicalOps(this.token); break;
      }
    },
    suggestFields: function(val) {
      val = val.toLowerCase();
      this.suggestions = [{ label: 'Fields', data: this.fieldSuggestions.filter(f => { return f.toLowerCase().indexOf(val) > -1; }) }];
    },
    suggestOperators: function(val) {
      val = val.toUpperCase();
      this.suggestions = [{label: 'Operators', data: this.operators.filter(o => { return o.indexOf(val) > -1; }) }];
    },
    suggestValues: function(val) {
      var selectedValues = [];
      var fieldToken = (this.tokens['field2']).trim();
      if(val.length > 0 && this.tokens['operator2'].trim().toUpperCase() == 'IN') {
        selectedValues = val.replace(/[[\]]/ig,'').split(',').map(v => { return v.replace(/'/g,'').trim(); });
        val = selectedValues.length > 0 ? selectedValues[selectedValues.length - 1].toLowerCase() : '';
      }
      var fieldSetting = this.fieldSettings.filter(fs => { return fs.name == fieldToken; })[0];
      var values = ["''"];
      if(fieldSetting.values) {
        values = fieldSetting.values ? fieldSetting.values.filter(f => { return !selectedValues.includes(f) && f.toLowerCase().indexOf(val) > -1; }) : null;
        if(fieldSetting.type == 'text') values = values.map(v => { return "'" + v + "'"});
      }
      this.suggestions = [{
        label: fieldSetting.values ? 'Values' : `Hint: Provide a ${fieldSetting.type || 'text'} value for ${fieldToken}.`, 
        data: values
      }]
    },
    suggestLogicalOps: function() {
      this.suggestions = [{name: 'Logical Operators', data:['AND', 'OR']}];
    }
  },
  mounted() {
    this.suggestFields('');
    this.searchBox = this.$refs.autosuggest.$el.querySelector('input.autosuggest');
    var ops = this.operators.sort((o1,o2) => { return o2.length -o1.length; }).join('|');
    var fields = '(?<field3>[\\s](?!and|or)[\\w]+)';
    this.regex = `(?:${fields}(?<operator3>[\\s](?:${ops}))(?<values3>[\\s](?:[\\w]+|'[\\w\\s%]*'|\\[[\\w%,\\s']*\\]))(?<logicalop3>[\\s](?:AND|OR)?)|(?<field2>[\\s](?!and|or)[\\w]+)(?<operator2>[\\s](?:${ops}))(?<values2>[\\s](?:[\\w]+|'[\\w\\s%]*'?|\\[[\\w%,\\s']*\\]?)?)|(?<field1>[\\s](?!and|or)[\\w]+)(?<operator1>[\\s](?:${ops})?)|(?<field>[\\s](?!and|or)[\\w]*))$`;
  },
  created() {
    this.bracketsRegex = /[()]/g;
    this.inBracketRegex = /IN\s\(([',\s\w]*)\)?/ig;
    this.multiSpaceRegex = /\s\s+/g;
  }
}
</script>

