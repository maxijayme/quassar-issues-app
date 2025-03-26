import { useQuery } from "@tanstack/vue-query";
import githubApi from "src/api/githubApi";
import type { State,  Issue } from "../interfaces/issue";
import { useIssuesStore } from "src/stores/issues";
import { storeToRefs } from "pinia";


const useIssues = () => {

  const getIssues = async (state: State, labels: string[]):Promise<Issue[]> => {
    const params = new URLSearchParams()

    if(state) {
      params.append('state', state)
    }
    if(labels.length) {
      params.append('labels', labels.join(','))
    }
    params.append('per_page', '10')
    const {data} = await githubApi<Issue[]>(`/issues`, {
      params
    })
    return data
  }
  const issuesStore = useIssuesStore();
  const {state, labels} = storeToRefs(issuesStore);

  const issuesQuery = useQuery({
    queryKey: ["issues", {state, labels}],
    queryFn: () => getIssues(state.value, labels.value),
    staleTime: 1000 * 60 * 5,
  })


   return {
    issuesQuery
   }
}

export default useIssues;
