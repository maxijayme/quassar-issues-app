import { useQuery } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import githubApi from "src/api/githubApi";
import type Label from "src/issues/interfaces/label";
import { useIssuesStore } from "src/stores/issues";

const getLabels = async ():Promise<Label[]> => {
  const response = await githubApi<Label[]>("/labels?per_page=100");
  return response.data;
}

const useLabels = () => {
  const issuesStore = useIssuesStore();
  const { labels } = storeToRefs(issuesStore);

  const labelsQuery = useQuery(
    {
      queryKey: ['labels'],
      queryFn:  getLabels,
      staleTime: 1000 * 60 * 60, //1 hora
    }
  );

  const allLabels = labelsQuery.data || [];

  return {
  labels: allLabels,
  isLoading: labelsQuery.isLoading,
  selectedLabes: labels,
  //Methods
  toggleLabel: issuesStore.toggleLabel

  }
}

export default useLabels;
