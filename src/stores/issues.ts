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
    toggleLabel( labelName: string ) {
      throw new Error('Not implemented')
    }
  }
})
