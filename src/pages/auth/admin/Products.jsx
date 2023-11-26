import Jumbo from "../../../components/cards/Jumbo";
import { useAuth } from "../../../context/auth";
import AdminMenu from "../../../components/nav/AdminMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Products() {
  const REACT_APP_API = "http://localhost:8000/api"; //this is the server endpoint

  //context
  const [auth, setAuth] = useAuth();

  //state
  const [products, setProducts] = useState([]);

  //get products
  useEffect(() => {
    loadProducts();
  }, []);

  //function to get all the products
  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <div>orders orders</div>
      <Jumbo
        title={`Welcome ${auth?.user?.name}`}
        subTitle={"Product Catalogue"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h5 bg-light">Products</div>
            {/* rendering the products list using cards */}
            {products?.map((p) => (
              <Link
                className="text-decoration-none"
                key={p._id}
                to={`/dashboard/admin/product/update/${p.slug}`}
              >
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`${REACT_APP_API}/product/photo/${p._id}`}
                        alt={p.name}
                        className="img img-fluid rounded-start"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{p?.name}</h5>
                        <p className="card-text">{p?.description?.substring(0,200)}...</p>
                        <p className="card-text">
                          <small className="text-muted ">
                            {moment(p.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
