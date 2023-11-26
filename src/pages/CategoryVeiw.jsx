import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Jumbo from "../components/cards/Jumbo";
import ProductCard from "../components/cards/ProductCard";

export default function CategoryView() {
  //state
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  //hook
  const params = useParams();
  const navigate = useNavigate();

  //   console.log(params);
  useEffect(() => {
    if (params.slug) loadProductsByCategory();
  }, [params.slug]);

  const loadProductsByCategory = async () => {
    try {
      const { data } = await axios.get(`products-by-category/${params.slug}`);
      console.log(data);

      setProducts(data.products);
      setCategory(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Jumbo
        title={category.name}
        subTitle={`${products.length} products found in ${category.name} category`}
      />
      <div className="container fluid">
        <div className=" row mb-3">
          {products.map((p) => (
            <div key={p._id} className="col-md-4">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
