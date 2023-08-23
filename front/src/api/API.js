import axios from "axios";

const serverURL = "http://localhost:3001";

const API = async (endpoint, method, data) => {
  const headers = {
    "Content-type": "application/json",
  };

  const options = {
    url: serverURL + endpoint,
    method: method,
    headers: headers,
    data: data,
  };

  try {
    const response = await axios(options);
    return response;
  } catch (error) {
    if (error.response) {
      console.log("Error status:", error.response.status);
    }
    throw error;
  }
};

export default API;
