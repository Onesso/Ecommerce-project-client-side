import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingGIF from "../../images/loading2.gif";

export default function Loading({path = "Login"}) {
  //state
  const [count, setCount] = useState(3);

  //hook
  const navigate = useNavigate(); //this hook navigates you to the page
  const location = useLocation(); //this hook is responsible for saving the path name of a selected page

  //console.log(location);

  //this code will make the page wait for 3 second then redirect back to the loginpa
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //redirect once current count is 0
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });

    //clear-up
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <img src={LoadingGIF} alt="Loading" />
    </div>
  );
}
