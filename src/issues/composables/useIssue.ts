import githubApi from "src/api/githubApi";
import type { Issue } from "../interfaces/issue";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";

const getIssue = async( issueNumber:number ):Promise<Issue> => {
  const {data} = await githubApi.get<Issue>(`/issues/${issueNumber}`)
  return data
}

const getIssueComments = async( issueNumber:number ):Promise<Issue[]> => {
  const {data} = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`)
  return data
}

interface Options{
  //Autocargar la petición de issues y comments
  autoload?: boolean
}
const useIssue = ( issueNumber:number, options?:Options) => {

  //acceso global a la instancia de queryClient
  const queryClient = useQueryClient();

  const {autoload = true} = options || {}

  const issueQuery = useQuery({
    queryKey: ["issue", issueNumber],
    queryFn: () => getIssue(issueNumber),
    enabled: autoload,
    staleTime: 1000 * 60 // 1 minutes
  })
  const issue= issueQuery.data

  const issueCommentsQuery = useQuery({
    queryKey: ["issue", issueNumber, 'comments'],
    queryFn: () => getIssueComments(issue.value?.number || 0),
    // queryFn: () => getIssueComments(issueNumber),
    enabled: computed(() => !!issue.value && autoload), // sólo dispara la petición si issue.value es true
    staleTime: 1000 * 60 // 1 minutes
  })
  const issueComments= issueCommentsQuery.data

  //Prefetch de la issue y sus comentarios
  const prefetchIssue = async( issueNumber:number ) => {
    await queryClient.prefetchQuery({
      queryKey: ["issue", issueNumber],
      queryFn: () => getIssue(issueNumber),
      staleTime: 1000 * 60
    })

    await queryClient.prefetchQuery({
      queryKey: ["issue", issueNumber, 'comments'],
      queryFn: () => getIssueComments(issueNumber),
      staleTime: 1000 * 60 // 1 minutes
    })
  }

  //Carga la cache con los datos de la issue sin volver a hacer la petición
  const setIssueCacheData = (issue:Issue) => {
    queryClient.setQueryData(
      ["issue", issue.number],
       issue
    )
  }

  return {
    issue,
    issueComments,
    isLoadingComments: issueCommentsQuery.isLoading,
    isLoading: issueQuery.isLoading,
    //Methods
    prefetchIssue,
    setIssueCacheData
  }
}

export default useIssue;
