<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from 'src/issues/components/filter-selector/FilterSelector.vue';
import IssueList from 'src/issues/components/issue-list/IssueList.vue';
import useIssues from '../composables/useIssues';
import FloatingButtons from '../components/FloatingButtons.vue';
import { ref } from 'vue';
import NewIssueDialog from '../components/NewIssueDialog.vue';
import { ButtonSize, type FloatingButtonsProps } from '../interfaces/buttons';
import useLabels from '../composables/useLabels';

const {issuesQuery} = useIssues()

const { labels } = useLabels()

const isOpen = ref<boolean>(false)

const floatingButtons = ref<FloatingButtonsProps[]>([
  {
    icon: 'add',
    color: 'primary',
    size: ButtonSize.MEDIUM,
    action: () => openDialog()
  }
])

const openDialog = () =>{
  isOpen.value = true
}

const closeDialog = () =>{
  isOpen.value = false
}

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

  <!-- FloatingButtons -->
  <FloatingButtons :floatingButtons/>
  <!-- IssuDialog -->
  <NewIssueDialog :isOpen="isOpen" @onClose="closeDialog" :labels="labels || []"/>
</template>
<style lang="scss" scoped>

</style>
