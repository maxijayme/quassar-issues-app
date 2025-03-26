<script setup lang="ts">
import { toRefs } from 'vue';
import { ButtonSize, type FloatingButtonsProps } from '../interfaces/buttons';

interface Props{
  floatingButtons: FloatingButtonsProps[]
}

 const props = defineProps<Props>()
 const {floatingButtons} = toRefs(props)

</script>

<template>
  <!-- fab: floatig action button -->
  <div class="fab">
    <q-btn v-for="btn of floatingButtons"
      round
      class="q-mr-sm"
      :key="btn.icon"
      :color="btn.color || 'primary'"
      :icon="btn.icon"
      :size="btn.size || ButtonSize.MEDIUM"
      @click="btn.action"
    />
  </div>
</template>

<style scoped>
  .fab {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }

</style>
