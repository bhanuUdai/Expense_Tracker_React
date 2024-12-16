import axios from "axios";
import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { authAction } from "../store/auth-reducer";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

    const userlogOuthandler = () => {
      dispatch(authAction.removeExpenseToken());
      dispatch(authAction.removeUserEmail());
      dispatch(authAction.setProjectId(""));
      history.replace("/");
    };

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
      let errorMessage = (err.response?.data?.error?.errors[0]?.message || err.response?.data?.detail||  err.message || "Something went wrong");
      console.log("errorMessage==>", errorMessage); 

      if (errorMessage.toLowerCase().includes("token")) {
        userlogOuthandler();
        history.push("/");
      }
      setError(errorMessage);
    }finally{
      setLoading(false);
    }
  }, []);

  return { error, sendRequest, loading };
};
export default useHttp;
