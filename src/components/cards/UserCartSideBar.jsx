import { useAuth } from "../../context/auth";
import { useCart } from "../../context/Cart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast"

export default function UserCartSideBar() {
  //hooks
  const [auth, setAuth] = useAuth();

  //context
  const [cart, setCart] = useCart([]);

  //state
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getClientToken = async () => {
    try {
      const { data } = await axios.get("braintree/token");
      console.log("this is the Token =>", data);
      setClientToken(data.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getClientToken();
    }
  }, [auth?.token]);

  //function calculate the total
  const totalCost = () => {
    let total = 0;

    cart.map((items) => {
      total = total + items.price;
    });

    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "KSh",
    });
  };

  //process payment
  const handlePayment = async () => {
    try {
      setLoading(true);

      const { nonce } = await instance.requestPaymentMethod();
      console.log(" this is the nonce =>", nonce);




      const { data } = await axios.post("/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false)
      navigate("/dashboard/user/oders");
      toast.success("Payment Successful");

      console.log("this is the data => ", data);
      localStorage.removeItem("cart");
      setCart([]);


    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  return (
    <div className="mb-5">
      <h4>Your Cart Summary</h4>
      <hr />
      <h5>Total Cost: {totalCost()}</h5>
      <hr />

      {auth?.user?.address ? (
        <div>
          <div className="mb-3">
            <hr />
            <h4>Delivery address: {auth.user.address}</h4>
          </div>
          <button
            className="btn btn-outline-danger"
            onClick={() => navigate("/dashboard/user/profile")}
          >
            Update address
          </button>
        </div>
      ) : (
        <div className="mb-3">
          {auth?.token ? (
            <button
              className="btn btn-outline-warning"
              onClick={() => navigate("/dashboard/user/profile")}
            >
              Add delivery address
            </button>
          ) : (
            <button
              className="btn btn-outline-danger mt-3"
              onClick={() =>
                navigate("/login", {
                  state: "/cart",
                })
              }
            >
              Login to checkout
            </button>
          )}
        </div>
      )}
      {!clientToken || !cart.length ? (
        ""
      ) : (
        <>
          <DropIn
            options={{
              authorization: clientToken,
              // paypal: {
              //   flow: "vault",
              // },
            }}
            onInstance={(instance) => setInstance(instance)}
          />
        </>
      )}
      <div>
        <button
          className="btn btn-outline-success col-12 mt-3"
          // disabled={!auth?.user?.address || !instance || loading}
          onClick={handlePayment}
        >
          {loading ? "Processing..." : "Pay"}
        </button>
      </div>
    </div>
  );
}
