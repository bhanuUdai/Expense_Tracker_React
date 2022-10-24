import React, { useState } from "react";
import ExpenseContext from "./expense-context";
const ContextProvier = (prop) => {
  const storedToken = localStorage.getItem("ExpenseToken");
  const [tokenId, setTokenId] = useState(storedToken);
  const [name, setName] = useState();
  const [photoUrl, setPhotoUrl] = useState();

  const ExpenseTokenHandler = (token) => {
    setTokenId(token);
    localStorage.setItem("ExpenseToken", token);
  };

  const userDetaisHandler=(data)=>
  {
    console.log(data)
    setName(data.name);
    setPhotoUrl(data.url);
  }

  const logOutHandler=()=>
  {
    setTokenId();
    localStorage.removeItem("ExpenseToken")
  }

  return (
    <ExpenseContext.Provider
      value={{
        getExpenseToken: ExpenseTokenHandler,
        ExpenseToken: tokenId,
        userDetails: userDetaisHandler,
        userName:name,
        profileUrl:photoUrl,
        logOut:logOutHandler
      }}
    >
      {prop.children}
    </ExpenseContext.Provider>
  );
};

export default ContextProvier;
