import { useCart } from "../context/Cart";
import Jumbo from "../components/cards/Jumbo";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

import UserCartSideBar from "../components/cards/UserCartSideBar";
import ProductCardHorizontal from "../components/cards/ProductCardHorizontal";

export default function Cart() {


  //context
  const [cart, setCart] = useCart([]);
  const [auth, setAuth] = useAuth();

  //hooks
  const navigate = useNavigate();



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

  return (
    <>
      <Jumbo
        title={`Hello ${auth?.token && auth?.user?.name}`}
        subTitle={
          cart?.length > 0
            ? `${cart?.length} products added to your cart. ${
                auth?.token ? "" : "Please loging to checkout!!"
              }`
            : "Your cart is empty"
        }
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
              {cart?.length > 0 ? (
                "My Cart"
              ) : (
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {cart?.length && (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {cart?.map((p, index) => (
                  <ProductCardHorizontal key={index}  p={p} />
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <UserCartSideBar />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
