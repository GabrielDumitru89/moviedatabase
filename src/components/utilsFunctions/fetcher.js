import axios from "axios";

export const fetcher = async (params) => {
  const options = {
    method: "GET",
    url: `${process.env.REACT_APP_BASE_URL}${params}`,
    headers: {
      "X-RapidAPI-Key": `${process.env.REACT_APP_API_KEY}`,
      "X-RapidAPI-Host": `${process.env.REACT_APP_API_HOST}`,
    },
  };

  try {
    // console.log("Making API request to:", options.url);
    const { data } = await axios(options);
    // console.log("API response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};
