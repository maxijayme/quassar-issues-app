import { useQuery } from "@tanstack/vue-query";
import githubApi from "src/api/githubApi";
import type { Issue } from "../interfaces/issue";


const useIssues = () => {

  const getIssues = async ():Promise<Issue[]> => {
    const params = new URLSearchParams()

    params.append('per_page', '10')
    const {data} = await githubApi<Issue[]>(`/issues`, {
      params
    })
    return data
  }
  const issuesQuery = useQuery({
    queryKey: ["issues"],
    queryFn: getIssues,
  })


   return {
    issuesQuery
   }
}

export default useIssues;
