import axios from "axios";
import { DashboardSchema } from "../schemas/dashboardSchema";


const API_URL =
  "http://127.0.0.1:8000";



export const getDashboard = async (
  prompt: string
) => {


  const response = await axios.post(

    `${API_URL}/api/generate-dashboard`,

    {
      prompt
    }

  );



  const data =
    response.data;



  const validatedData =
    DashboardSchema.parse(data);



  return validatedData;

};