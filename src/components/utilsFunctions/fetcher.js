import React from 'react'

import axios from 'axios';
export const fetcher = (params) => {
  const options = {
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_URL}${params}`,
    headers: {
      'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
      'X-RapidAPI-Host': `${process.env.REACT_APP_API_HOST}`
    }
  };

  try {
    const response = await axios.request(options);
    if (response.ok) {
      return response
    } else {
      return null
    }
  } catch (error) {
    throw new Error("Something is wrong!!!!")
  }

}
