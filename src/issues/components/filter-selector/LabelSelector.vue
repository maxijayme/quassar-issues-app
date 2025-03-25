<script setup lang="ts">
import useLabels from 'src/issues/composables/useLabels';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';

const { labels, isLoading, toggleLabel, selectedLabes } = useLabels();
</script>

<template>
  <div class="q-mt-md">
    <LoaderSpinner v-if="isLoading" size="50px" :thickness="1" :show-loader-msg="false"/>
    <div v-else>
      <q-chip
        v-for="label of labels"
        :key="label.node_id"
        :style="{color: `#${label.color}`}"
        :outline="!selectedLabes.includes(label.node_id)"
        clickable
        @click="toggleLabel(label.node_id)">
        {{ label.name }}
      </q-chip>
    </div>
  </div>
</template>

<style scoped>

</style>
