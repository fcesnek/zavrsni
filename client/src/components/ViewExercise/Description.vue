<template>
  <panel title="Description">
    <textarea
      readonly
      v-model="exercise.description">
    </textarea>
  </panel>
</template>

<script>

export default {
  props: [
    'exercise'
  ]
}
</script>

<style scoped>
textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 600px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
}
</style>
