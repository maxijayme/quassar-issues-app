<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { useRoute } from 'vue-router';
import IssueCard from '../components/issue-list/IssueCard.vue';
import useIssue from '../composables/useIssue';


const route = useRoute();
const { id } = route.params;

const {issue, isLoading, issueComments, isLoadingComments} = useIssue(Number(id));

</script>

<template>
  <router-link class="text-white" to="/">Go Back</router-link>
  <!-- Header -->
  <LoaderSpinner v-if="isLoading" :show-loader-msg="false"/>
  <IssueCard v-else-if="issue" :issue="issue"/>
  <span v-else> Issue with ID {{ id }} not found</span>

  <!-- Comentarios -->
  <LoaderSpinner v-if="isLoadingComments" :thickness="1" size="1.5rem" :show-loader-msg="false"/>

  <div v-else-if="issueComments" class="column">
    <span class="text-h3 q-mb-md">Comments ({{ issue?.comments }})</span>
    <IssueCard v-for="comment of issueComments" :key="comment.id ||0 " :issue="comment" />
  </div>
</template>
<style lang="scss" scoped>

</style>
