<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from 'src/issues/components/filter-selector/FilterSelector.vue';
import IssueList from 'src/issues/components/issue-list/IssueList.vue';
import useIssues from '../composables/useIssues';

const {issuesQuery} = useIssues()
</script>

<template>
  <div class="row q-mb-md">
    <div class="col-12">
      <span class="text-h4">Github Issues</span>
    </div>
  </div>

  <div class="row">
    <div class="col-xs-12 col-md-4">
      <!-- TODO: Filtros -->
       <!-- FilterSelector -->
      <FilterSelector/>
    </div>

    <div class="col-xs-12 col-md-8">
      <!-- TODO: Loader -->
       <LoaderSpinner v-if="issuesQuery.isLoading.value"/>
      <!-- TODO: IssuList - Array de IssueCard -->
       <div v-else>
         <IssueList :issues="issuesQuery.data?.value || []"/>
       </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>
