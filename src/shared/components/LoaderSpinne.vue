<script setup lang="ts">
import { ref } from 'vue';


interface Props {
  color?: string;
  size?: string;
  thickness?: number;
}

withDefaults(defineProps<Props>(), {
  color: 'white',
  size: '3rem',
  thickness: 5
})

const loadingMsg = ref('Loading...')

</script>

<template>
  <div class="column items-center">
    <q-spinner :color :size :thickness/>
    <span class="q-mt-sm">{{ loadingMsg }}</span>
  </div>
</template>

<style scoped>

</style>
