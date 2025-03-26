import githubApi from "src/api/githubApi";
import type { Issue } from "../interfaces/issue";
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";

const getIssue = async( issueNumber:number ):Promise<Issue> => {
  const {data} = await githubApi.get<Issue>(`/issues/${issueNumber}`)
  return data
}

const getIssueComments = async( issueNumber:number ):Promise<Issue[]> => {
  const {data} = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`)
  return data
}

const useIssue = ( issueNumber:number) => {

  const issueQuery = useQuery({
    queryKey: ["issue", issueNumber],
    queryFn: () => getIssue(issueNumber),
    staleTime: 1000 * 60 // 1 minutes
  })
  const issue= issueQuery.data

  const issueCommentsQuery = useQuery({
    queryKey: ["issue", issueNumber, 'comments'],
    queryFn: () => getIssueComments(issue.value?.number || 0),
    // queryFn: () => getIssueComments(issueNumber),
    enabled: computed(() => !!issue.value), // sólo dispara la petición si issue.value es true
    staleTime: 1000 * 60 // 1 minutes
  })
  const issueComments= issueCommentsQuery.data

   return {
    issue,
    issueComments,
    isLoadingComments: issueCommentsQuery.isLoading,
    isLoading: issueQuery.isLoading,
   }
}

export default useIssue;
