import axios from "axios";
import React, { useState, useCallback } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);

  const postRequest = useCallback(async (requestConfig, resData) => {
    setError(null);
    try {
      const res = await axios.post(requestConfig.url, requestConfig.body, {
        headers: requestConfig.header,
      });
      console.log(res);
      resData(res);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  }, []);

  return { error, postRequest };
};
export default useHttp;
