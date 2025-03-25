<script setup lang="ts">
import type { Issue } from 'src/issues/interfaces/issue';
import IssueCard from './IssueCard.vue';

interface Props {
  issues: Issue[];
}

const props = defineProps<Props>();

</script>

<template>
  <div class="row">
    <IssueCard v-for="issue of props.issues" :key="issue.id" :issue/>
  </div>
</template>

<style scoped>

</style>
