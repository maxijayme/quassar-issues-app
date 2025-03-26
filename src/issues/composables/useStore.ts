import { storeToRefs } from "pinia";
import { useIssuesStore } from "src/stores/issues";


const useStore = () => {

  const useStore = useIssuesStore()
  const {state, labels} = storeToRefs(useStore)


   return {
    //reactive data
    state,
    labels,
    //methods (computed)

    //actions
   }
}

export default useStore;
