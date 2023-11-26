import Jumbo from "../../../components/cards/Jumbo";
import { useAuth } from "../../../context/auth";
import UserMenu from "../../../components/nav/UserMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserProfile() {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPasswaord] = useState("");

  useEffect(() => {
    if (auth?.user) {
      const { name, email, address, password } = auth.user;
      setName(name);
      setAddress(address);
      setEmail(email);
      setPasswaord(password);
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/profile", {
        name,
        password,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      }
      console.log(data);
      
      setAuth({ ...auth, user: data });

      //updating the local storage
      let ls = localStorage.getItem("auth"); //getting the initial data
      ls = JSON.parse(ls);
      ls.user = data; //replacing with the new data
      localStorage.setItem("auth", JSON.stringify(ls));
      toast.success("profile is updated");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Jumbo title={`Welcome ${auth?.user?.name}`} subTitle={"Dashboard"} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h5 bg-light"> Profile</div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control m-2 p-2"
                placeholder="Enter your name "
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus={true}
              />
              <input
                type="email"
                className="form-control m-2 p-2"
                placeholder="Enter your email "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={true}
              />
              <input
                type="password"
                className="form-control m-2 p-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPasswaord(e.target.value)}
              />
              <textarea
                className="form-control m-2 p-2"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button className="btn btn-outline-success m-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
