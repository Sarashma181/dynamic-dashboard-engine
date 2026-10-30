import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../services/dashboardService";


export const useDashboard = (
  prompt:string
) => {


  return useQuery({

    queryKey:[
      "dashboard",
      prompt
    ],


    queryFn:() =>
      getDashboard(prompt),


    enabled:
      !!prompt


  });


};