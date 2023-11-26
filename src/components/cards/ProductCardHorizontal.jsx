import moment from "moment";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/Cart";
import { useNavigate } from "react-router-dom";

export default function ProductCardHorizontal({ index, p, remove = true }) {
  const REACT_APP_API = "http://localhost:8000/api"; //this is the server endpoint

  //context
  const [cart, setCart] = useCart([]);
  const [auth, setAuth] = useAuth();

  //hooks
  const navigate = useNavigate();

  //function
  const removeFromCart = (productId) => {
    let myCart = [...cart];

    let index = myCart.findIndex((item) => item._id === productId);

    myCart.splice(index, 1);

    setCart(myCart);

    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  return (
    <div
      className="card mb-3"
      // style={{ maxWidth: "540px" }}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={`${REACT_APP_API}/product/photo/${p._id}`}
            alt={`p.name`}
            style={{
              height: "150px",
              width: "150px",
              objectFit: "cover",
              marginLeft: "-12px",
              WebkitBorderTopRightRadius: "0px",
            }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{p.name}</h5>
            <p className="card-text">
              {`${p.description.substring(0, 50)}...`}
            </p>
            <div>
              <p className="fw-bold">
                {p?.price?.toLocaleString("KSh", {
                  style: "currency",
                  currency: "KSh",
                })}
              </p>
            </div>

            <div className="d-flex justify-content-between p-0">
              <p className="card-text">
                <small className="text-muted">
                  Listed {moment(p.createdAt).fromNow()}
                </small>
              </p>

              {remove && (
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeFromCart(p._id)}
                >
                  remove
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
