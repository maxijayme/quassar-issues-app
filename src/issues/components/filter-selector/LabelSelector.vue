<script setup lang="ts">
import LoaderSpinne from 'src/shared/components/LoaderSpinne.vue';


</script>

<template>
  <LoaderSpinne size="50px" :thickness="1" :show-loader-msg="false"/>
  <q-chip v-for="label of 10" :key="label" color="primary" outline clickable>
    Algun nombre
  </q-chip>
</template>

<style scoped>

</style>
