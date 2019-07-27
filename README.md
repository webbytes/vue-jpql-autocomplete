# vue-jpql-autocomplete

A VueJS component that can accept user input to be used to generate a SQL where condition or JPA compliant JPQL where condition. The component provides suggestions for the user to select fields, operators or values from a provided list during configuration.

## Table of contents
1. [Get started using NPM](#get-started-using-npm)
2. [Simple usage in vue application](#simple-usage-in-vue-application)
3. [Supported properties](#supported-properties)
4. [Field settings object definition](#field-settings-object-definition)
5. [Demo](https://webbytes.github.io/vue-jpql-autocomplete/demo.html)

## Get started using NPM
```
npm install @webbytes/vue-jpql-autocomplete --save
```
## Simple Usage in vue application
In script:
``` javascript
import VueJpqlAutocomplete from './components/VueJpqlAutocomplete.vue';

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
    <vue-jpql-autocomplete 
      placeholder="enter query here..." 
      :field-settings="[
        { name: 'status', values: ['Open','Closed'], type: 'string' },
        { name: 'id', type: 'number' },
        { name: 'description', type: 'string' }
      ]"
      :operators="['=','<>','>','>=','<','<=']"/>

</template>
```
## Supported properties
|Property|Description|Examples|
|---|---|---|
|placeholder|string value that is used to provide the placeholder text when no value is entered in the autocomplete box.|Please enter query here...|
|operators|array of string operators supported. Does not support operators with spaces currently.|['=','<>','>','>=','<','<=']|
|field-settings|array of field objects that can be used for providing a lookup list for the user to pick the fields or its values from.|[{ name: 'status', values: ['Open','Closed'], type: 'string' },{ name: 'id', type: 'number' },{ name: 'description', type: 'string' }]

## Field Settings Object definition
Fied Settings provided as a array in the field settings property is an array of field objects having the following fields:

|name|type|description|
|---|---|---|
|name|string|name of the field. Used for matching the field with the text typed by the user. E.g. name, description, status, etc.|
|type|string|the type of the field. Used in the help text shown to user if there are no values to be picked up from. E.g. text, number, etc.|
|values|Array of strings|Array of string values that are matched with the user text to provide the suggestions. E.g. ['Open','Closed']|

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
