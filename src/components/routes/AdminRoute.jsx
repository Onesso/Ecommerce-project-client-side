import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"; //this is for redirection to another component
import { useAuth } from "../../context/auth";
import Loading from "./Loading";
import axios from "axios";

export default function AdminRoute() {
  // context - it it the one that store the user informtion and token locally
  const [auth, setAuth] = useAuth();
  // state
  const [ok, setOk] = useState(false); //it will be changed to true if only you have the longed in user

  useEffect(() => {
    //this function call also be written outside the hook
    const adminCheck = async () => {
      const { data } = await axios.get(`/admin-check`);
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) adminCheck(); //exercuting the function
  }, [auth?.token]);


  return ok ? <Outlet /> : <Loading path=""/>;
}
