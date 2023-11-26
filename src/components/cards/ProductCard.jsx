import moment from "moment";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/Cart";
import toast from "react-hot-toast";

export default function ProductCard({ p }) {
  const REACT_APP_API = "http://localhost:8000/api"; //this is the server endpoint
  //context
  const [cart, setCart] = useCart();
  //hook
  const navigate = useNavigate();

  return (
    <div className="card mb-3 m-2 hoverable">
      {/*hoverable is a self-declared css class for creating hover effect */}
      <Badge.Ribbon text={`${p.sold} sold`} color="cyan">
        <Badge.Ribbon
          text={`${
            p.quantity >= 1
              ? `${p.quantity - p.sold} In Stock `
              : `Out Of Stock`
          }`}
          color="magenta"
          placement="start"
        >
          <img
            className="card-img-top"
            src={`${REACT_APP_API}/product/photo/${p._id}`}
            alt={p._id}
            style={{
              height: "300px",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Badge.Ribbon>
      </Badge.Ribbon>
      <div className="card-body">
        <h3>{p.name}</h3>
        <h5 className="fw-bold">
          {p?.price?.toLocaleString("KSh", {
            style: "currency",
            currency: "KSh",
          })}
        </h5>

        <p className="card-text">Description: {p.description.substring(0, 60)}...</p>
        <p>Uploaded: {moment(p.createdAt).fromNow()}</p>
        <p>{p.sold}</p>
      
        
      </div>
      <div className="d-flex justify-content-between">
        <div
          className="btn btn-primary col card-button"
          style={{ borderBottomLeftRadius: "5px" }}
          onClick={() => navigate(`/product/${p.slug}`)}
        >
          veiw product
        </div>
        {/* how to add products to cart */}
        <div
          className="btn btn-outline-primary col card-button"
          style={{ borderBottomRightRadius: "5px" }}
          onClick={() => {
            setCart((prevCart) => {
              const newCart = [...prevCart, p];
              localStorage.setItem("cart", JSON.stringify(newCart));
              return newCart;
            });
            toast.success("Added to Cart");
          }}
        >
          add to cart
        </div>
      </div>
    </div>
  );
}

{
  /* <div
className="btn btn-outline-primary col card-button"
style={{ borderBottomRightRadius: "5px" }}
onClick={() => {
  setCart([...cart, p]);
  localStorage.setItem("cart", JSON.stringify([...cart, p]));
  toast.success("Added to Cart");
}}
>
add to cart
</div> */
}
