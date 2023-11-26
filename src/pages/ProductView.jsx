import { useParams } from "react-router-dom";
import axios from "axios";
import { Badge } from "antd";
import moment from "moment";
import ProductCard from "../components/cards/ProductCard";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";

import {
  FaDollarSign,
  FaProjectDiagram,
  FaRegClock,
  FaCheck,
  FaTimes,
  FaRocket,
  FaWarehouse,
} from "react-icons/fa";
import { useState, useEffect } from "react";

export default function ProductView() {
  const REACT_APP_API = "http://localhost:8000/api"; //this is the server endpoint

  //context
  const [cart, setCart] = useCart();
  //state
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  //hook
  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProducts();
  }, [params?.slug]); //the array down here is for dependencies

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setProduct(data);
      loadCategory(data._id, data.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCategory = async (productId, categoryId) => {
    try {
      const { data } = await axios.get(
        `/related-product/${productId}/${categoryId}`
      );
      setRelatedProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-3 m-2 hoverable">
              {/*hoverable is a self-declared css class for creating hover effect */}
              <Badge.Ribbon text={`${product.sold} sold`} color="cyan">
                <Badge.Ribbon
                  text={`${
                    product?.quantity >= 1
                      ? `${product?.quantity - product?.sold} in stock`
                      : "Out of stock"
                  }`}
                  color="magenta"
                  placement="start"
                >
                  <img
                    className="card-img-top"
                    src={`${REACT_APP_API}/product/photo/${product._id}`}
                    alt={product._id}
                    style={{
                      height: "500px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Badge.Ribbon>
              </Badge.Ribbon>
              <div className="card-body">
                <h1>{product.name}</h1>

                <p className="card-text lead">{product.description}</p>
              </div>
              <div className="d-flex justify-content-between lead bg-light p-5 fw-bold">
                <div>
                  <p className="fw-bold">
                    <FaDollarSign />
                    &nbsp; Price:
                    {product?.price?.toLocaleString("KSh", {
                      style: "currency",
                      currency: "KSh",
                    })}
                  </p>{" "}
                  <p>
                    <FaProjectDiagram /> &nbsp;
                    {product?.category?.name}
                  </p>
                  <p>
                    <FaRegClock /> {moment(product?.createdAt).fromNow()}
                  </p>
                  <p>
                    {product?.quantity > 0 ? <FaCheck /> : <FaTimes />} &nbsp;
                    {product?.quantity > 0 ? "In Stock" : "Ouut of Stock"}
                  </p>
                  <p>
                    <FaWarehouse />
                    &nbsp; Available: {product?.quantity - product?.sold}
                  </p>
                  <p>
                    <FaRocket />
                    &nbsp; Sold {product?.sold}
                  </p>
                </div>
              </div>

              <div
                className="btn btn-outline-primary col card-button"
                style={{ borderBottomRightRadius: "5px" }}
                onClick={() => {
                  setCart([...cart, product]);
                  toast.success("Added to Cart");
                }}
              >
                add to cart
              </div>
            </div>
          </div>

          <div className="col-md-4">
            {relatedProduct < 1 && <p>No related Product</p>}
            {relatedProduct.map((p) => (
              <ProductCard p={p} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
