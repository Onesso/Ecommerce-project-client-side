import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"; //this is for redirection to another component
import { useAuth } from "../../context/auth";
import Loading from "./Loading";
import axios from "axios";

export default function PrivateRoute() {
  // context - it it the one that store the user informtion and token locally
  const [auth, setAuth] = useAuth();
  // state
  const [ok, setOk] = useState(false); //it will be changed to true if only you have the longed in user

  useEffect(() => {
    //this function call also be written outside the hook
    const authCheck = async () => {
      const { data } = await axios.get(`/auth-check`);
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) authCheck(); //exercuting the function
  }, [auth?.token]);

  //useEffect checks the local storage if token is availale(user is loging), it is used in this condition
  // useEffect(() => {
  //   if (auth?.token) {
  //     setOk(true);
  //   } else {                 this is used locally to check if auth context has a token, if yes the user is logged in
  //     setOk(false);
  //   }
  // }, [auth?.token]);           the useEffect take two values, a call back function and the dependency

  return ok ? <Outlet /> : <Loading />;
}
