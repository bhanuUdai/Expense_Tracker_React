import axios from "axios";
import { useState, useCallback } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, resData) => {
    setError(null);

    console.log("requestConfig==>", requestConfig.body);
    try {
      let res;

      // Handle different types of requests
      if (requestConfig.request === "delete") {
        res = await axios.delete(requestConfig.url, {
          data: requestConfig.body, // Sending body for DELETE requests
        });
      } else {
        console.log("requestConfig==>",requestConfig)
        res = await axios[requestConfig.request](
          requestConfig.url,
          requestConfig.body
        );
      }

      console.log(res);
      resData(res);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  }, []);

  return { error, sendRequest };
};
export default useHttp;
