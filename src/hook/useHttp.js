import axios from "axios";
import { useState, useCallback } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = useCallback(async (requestConfig, resData) => {
    setError(null);

    try {
      setLoading(true);
      let res;
      let authToken = (localStorage.getItem('ExpenseToken'));

      // console.log("requestConfig==>", requestConfig, authToken);

      let headers = {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        // 'Content-Type': 'application/json'
      };
      // if(requestConfig?.header){
      //   headers = requestConfig?.header;
      // }
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
          params: requestConfig.request === 'get' ? requestConfig.body : undefined, // Use params for GET
          data: requestConfig.request !== 'get' ? requestConfig.body : undefined, // Use data for other methods
          headers: headers,
        })
      }

      resData(res);
    } catch (err) {
      setError(err.response?.data?.error?.errors[0]?.message || err.message || "Something went wrong");
      console.log(err);
    }finally{
      setLoading(false);
    }
  }, []);

  return { error, sendRequest, loading };
};
export default useHttp;
