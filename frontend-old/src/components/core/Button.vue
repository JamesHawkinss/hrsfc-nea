
<template>
  <button @click="$emit('click')" :class="styles">
    <slot>Click me!</slot>
  </button>
</template>

<style scoped>
.button {
  color: #fff;

  font-family: inherit;
  font-size: initial;
  font-weight: bold;

  border: 0;
  border-radius: 100px;

  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
}

.button:hover {
  cursor: pointer;
}

.primary {
  background-color: #5751d6;
}

.secondary {
  background-color: #292b36;
}

.danger {
  background-color: #b5444b;
}
</style>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  computed: {
    styles() {
      const obj = {};
      obj[this.type] = true;

      return {
        button: true,
        ...obj,
      };
    },
  },
};
</script>