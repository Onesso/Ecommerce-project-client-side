import { useState } from "react";
import Jumbo from "../../components/cards/Jumbo";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // this library gives notifications resulting from the api calls made by axio library
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";





export default function Register() {
  //useState - it is a react hook that let me add a state variable in my component -- state lets a component remember(store) information like userr input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // i don't know what is wrong with my machine, .env is not
  //for standard protocal one domain can not make request to anothe domain

  const REACT_APP_API = "http://localhost:8000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${REACT_APP_API}/register`, {
        name,
        email,
        password,
      });
      // the question mark is a preliminary precaution when the is issue with server the error property will be assecced from data only if the data exist
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Registration Succeful");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed. TRY AGAIN");
    }
  };

  return (
    <>
      <div>
        <Jumbo title="Register" />
        <Toaster />
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={handleSubmit}>
                {/*the adavantage of enclossing everything ina form is that the user does not neccessarily have to press submit the user can just press enter */}
                <input
                  type="text"
                  className="form-control mb-4 p-2"
                  placeholder="Enter Name Here"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  type="email"
                  className="form-control mb-4 p-2"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  className="form-control mb-4 p-2"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
