import Jumbo from "../components/cards/Jumbo";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/cards/ProductCard";
import { useAuth } from "../context/auth";

export default function Home() {
  //state
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  //hook
  useEffect(() => {
    loadProducts();
    getTotal();
  }, []);

  //the condition is used to prevent the code from runing when the page mounts, the code only runs when when the value pages changes
  useEffect(() => {
    if (pages === 1) return;
    loadMore();
  }, [pages]);

  //res the total number of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/products-count");
      console.log(data);
      setTotal(data);
    } catch (error) {
      console.log(error);
    }
  };
  //gets all the products
  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/list-products/${pages}`);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/list-products/${pages}`);
      //here the initial products are retained and new products is added to the same state.
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const arra = [...products];
  const sortBySold = arra?.sort((a, b) => (a.sold < b.sold ? 1 : -1));

  return (
    <div>
      <Jumbo title={`Welcome Back ${auth?.user?.name}`} subTitle="continue Shopping"/>

      {/*the second props is already declared to a default value in the Jumbo component */}

      <div className="row">
        <div className="col-md-6">
          <h2 className="bg-light text-center p-2 mt-2 mb-2">New Arrivals</h2>

          <div className="row">
            {products?.map((p) => (
              <div className="col-md-6" key={p._id}>
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <h2 className="bg-light text-center p-2 mt-2 mb-2 ">Best Selling</h2>
          <div className="row">
            {sortBySold?.map((p) => (
              <div className="col-md-6" key={p._id}>
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* to display the load more button, we check if the products displayed(6) still have a remeinder then it is displayed */}
      <div className="container p-5 text-center">
        {products && products.length < total && (
          <button
            className="btn btn-warning btn-lg"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              setPages(pages + 1);
            }}
          >
            {loading ? "Loading" : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
}
