# vue-jpql-autocomplete

A VueJS component that can accept user input to be used to generate a SQL where condition or JPA compliant JPQL where condition. The component provides suggestions for the user to select fields, operators or values from a provided list during configuration.

## Table of contents
1. [Get started using NPM](#get-started-using-npm)
2. [Simple usage in vue application](#simple-usage-in-vue-application)
3. [Supported properties](#supported-properties)
4. [Field settings object definition](#field-settings-object-definition)
5. [Slots](#Slots)
6. [Demo](https://webbytes.github.io/vue-jpql-autocomplete/index.html)

## Get started using NPM
```
npm install @webbytes/vue-jpql-autocomplete --save
```
## Simple Usage in vue application
In script:
``` javascript
import VueJpqlAutocomplete from '@webbytes/vue-jpql-autocomplete';

export default {
  ...
  components: {
    VueJpqlAutocomplete
  },
  ...
}
```
In template:
``` html
<template>
    ...
    <vue-jpql-autocomplete 
      placeholder="enter query here..." 
      :field-settings="[
        { name: 'status', values: ['Open','Closed'], type: 'text' },
        { name: 'id', type: 'number' },
        { name: 'description', type: 'text' },
        { name: 'category', type: 'text', values: function(val, field) { 
            //Ajax call or any other method that returns a Promise that will be resolved on ajax response.
            ... 
          }
        }
      ]"
      :operators="['=','<>','>','>=','<','<=']"/>
    ...
</template>
```
## Supported properties
|Property|Description|Examples|
|---|---|---|
|placeholder|string value that is used to provide the placeholder <br/>text when no value is entered in the autocomplete box.|Please enter query here...|
|operators|array of string operators supported.<br/> Should be a subset ['LIKE','IN','<>','<=','>=','=','<','>']|['=','<>','>','>=','<','<=']|
|field-settings|array of field objects that can be used for providing <br/> a lookup list for the user to pick the fields or its values from.|[{ name: 'status', values: ['Open','Closed'], type: 'text' },<br/>{ name: 'id', type: 'number' },<br/>{ name: 'description', type: 'text' }]|
|suggest-on-select|boolean value used to set preference for auto suggestions to appear on selection of previous value. Defaut false.| true or false|

## Field Settings Object definition
Fied Settings provided as a array in the field settings property is an array of field objects having the following fields:

|name|type|description|
|---|---|---|
|name|string|name of the field. <br/>Used for matching the field with the text typed by the user. <br/>E.g. name, description, status, etc.|
|type|string|the type of the field. <br/>Used in the help text shown to user if there are no values to be picked up from. <br/>E.g. text, number, etc.|
|values|Array of strings<br/>OR<br/>Function (string value, string field) : Promise|Array of string values <br/>that are matched with the user text to provide the suggestions. <br/>E.g. ['Open','Closed']<br/>OR<br/>Function that accepts entered value and field name as strings and returns a Promise object that will be resolved|

## Slots
vue-jpql-autocomplete uses another vue package [vue-autosuggest](https://www.npmjs.com/package/vue-autosuggest) for providing the search box and options. Hence many features of this component can be used as is. The most important one being the slots for providing custom content within different sections of the control. The most common ones are:

``` html
<template slot="before-input"> content before the <input /> goes here </template>
<template slot="after-input"> content after the <input /> goes here </template>
<template slot="before-suggestions"> content before the <ul> goes here </template>
<template slot="after-section"> Default footer content for all sections </template>
<template slot="after-suggestions"> content after the <ul> goes here </template>
<template slot-scope="{suggestion}">Content for each suggestion as {{suggestion.item}}</template>
```
For complete details on how to use slots refer [here](https://www.npmjs.com/package/vue-autosuggest#slots).<br/>
Using scoped slots, one can easily change the displayed options of the suggestions.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
