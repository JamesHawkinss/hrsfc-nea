<template>
  <div class='textInput'>
    <label>{{label}}</label>
    <input v-bind:placeholder="placeholder" v-bind:type="type" />
  </div>
</template>

<style scoped>
input {
  background-color: #2a2c36;
  color: #fff;

  font-family: inherit;
  font-size: initial;
  font-weight: bold;

  border-color: #3a3c47;
  border-radius: 1.25rem;
  border-style: solid;

  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

input:focus {
  outline: none;
}

label {
  color: #fff;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: "",
      required: true,
    },
    label: {
      type: String,
      default: ""
    }
  },
};
</script>