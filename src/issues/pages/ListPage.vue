<script setup lang="ts">
import LoaderSpinne from 'src/shared/components/LoaderSpinne.vue';


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
    </div>

    <div class="col-xs-12 col-md-8">
      <!-- TODO: Loader -->
       <LoaderSpinne/>
      <!-- TODO: IssuList - Array de IsseCard -->
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>
