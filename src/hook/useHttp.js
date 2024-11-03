import axios from "axios";
import { useState, useCallback } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, resData) => {
    setError(null);

    console.log("requestConfig==>", requestConfig.body);
    try {
      let res;

      let authToken = (localStorage.getItem('ExpenseToken'));
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      };
      if(requestConfig?.type === "auth"){
        delete headers['Authorization']
      }
      // Handle different types of requests
      if (requestConfig.request === "delete") {
        res= await axios({
          cancelToken : null,
          method: requestConfig.request || 'get',
          url : requestConfig.url,
          data : requestConfig.body,
          headers: headers,
        })
      } else {
        res= await axios({
          cancelToken : null,
          method: requestConfig.request || 'get',
          url : requestConfig.url,
          data : requestConfig.body,
          headers: headers,
        })
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
