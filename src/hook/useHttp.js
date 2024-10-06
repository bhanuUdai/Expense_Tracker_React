import axios from "axios";
import  { useState, useCallback } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, resData) => {
    setError(null);

    console.log("requestConfig==>",requestConfig.body)
    try {
      const res = await axios[requestConfig.request](requestConfig.url,  {
        data: requestConfig?.body,
        headers: requestConfig.header,
      });

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
