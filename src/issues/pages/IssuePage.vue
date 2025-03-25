<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
// import { useRoute } from 'vue-router';
import IssueCard from '../components/issue-list/IssueCard.vue';


// const route = useRoute();
// const { id } = route.params;
</script>

<template>
  <LoaderSpinner />

  <router-link class="text-white" to="/">Go Back</router-link>
  <!-- Header -->
  <IssueCard />

  <!-- Comentarios -->
  <LoaderSpinner :thickness="1" size="1.5rem" :show-loader-msg="false"/>

  <div class="column">
    <span class="text-h3 q-mb-md">Comments (5)</span>
    <IssueCard v-for="comment of 5" :key="comment" />
  </div>
</template>
<style lang="scss" scoped>

</style>
