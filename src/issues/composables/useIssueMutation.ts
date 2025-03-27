import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { Issue } from "../interfaces/issue";
import githubApi from "src/api/githubApi";

interface Args{
  title: string;
  labels?: string[];
  body?: string;
}
const addIssue = async( { title, labels= [], body= '' }:Args):Promise<Issue>=> {
  const newIssue = {
    title,
    labels,
    body
  }
  const {data} = await githubApi.post('/issues', newIssue)
  return data;
}

const useIssueMutation = () => {

  const queryClient = useQueryClient();

  const issueMutation = useMutation<Issue, unknown, Args>({
    mutationFn: addIssue,
    onSuccess: async(issue) => {
      //invalido la cache de issues (la limpio)
      await queryClient.invalidateQueries({
        queryKey: ['issues'],
        exact: false
      })
      //refresco la cache de issues
      await queryClient.refetchQueries({
        queryKey: ['issues'],
        exact: false
      })
      //Carga la cache con los datos de la issue sin volver a hacer la petición
      await queryClient.setQueryData(
        ["issue", issue.number],
         issue
      )
    }
  })


   return {
    issueMutation
   }
}

export default useIssueMutation;
