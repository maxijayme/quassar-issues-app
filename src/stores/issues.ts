import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIssuesStore = defineStore('issues', () => {

  const state = ref('')
  const labels = ref<string[]>([])

  return {
    //state
    state,
    labels,

    //getters

    //actions
    toggleLabel( labelId: string ) {
      if(labels.value.includes(labelId)) {
        labels.value = labels.value.filter((id) => id !== labelId)
        return
      }
      
      labels.value.push(labelId)
    }
  }
})
