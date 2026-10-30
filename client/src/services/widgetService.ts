import axios from "axios";


const API_URL = "http://127.0.0.1:8000";


export const submitWidgetAction = async (
  payload: any
) => {

  const response = await axios.post(
    `${API_URL}/api/widget-action`,
    payload
  );


  return response.data;

};