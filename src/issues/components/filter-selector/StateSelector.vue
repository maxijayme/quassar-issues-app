<script setup lang="ts">
import { useIssuesStore } from 'src/stores/issues';
import { computed} from 'vue';


  const issuesStore = useIssuesStore();
// No es necesario usar computed porque no es necesario hacer nada en el setter. v-model bindea el valor de la variable a la propiedad value del componente
//   const issuesState = computed({
//   get: () => issuesStore.state,
//   set: (value) => {
//     issuesStore.state = value;
//   }
// });
</script>

<template>
  <q-btn-toggle v-model="issuesStore.state" toogle-color="primary" push spread :options="[
      {label: 'All', value: ''},
      {label: 'Open', value: 'open'},
      {label: 'Closed', value: 'closed'},
    ]"
  />
</template>

<style scoped>

</style>
