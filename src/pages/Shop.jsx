import { useState, useEffect } from "react";
import axios from "axios";
import Jumbo from "../components/cards/Jumbo.jsx";
import ProductCard from "../components/cards/ProductCard";
import { Checkbox, Radio } from "antd";
import { prices } from "./Prices.jsx";

export default function Shop() {
  //state
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  useEffect(() => {
    if (!checked.length || !radio.length) loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  //filtering products based on category and price
  useEffect(() => {
    if (checked.length || radio.length) loadFilteredProducts();
  }, [checked, radio]);

  const loadFilteredProducts = async () => {
    //checked and radio are received as body
    try {
      const { data } = await axios.post("/filtered-products", {
        checked,
        radio,
      });
      console.log(data)
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  //how to filter by category
  const handleChecked = (value, id) => {
    let all = [...checked]; // this an empty array all the checked values
    //if the checked is checked(true) the id of the particular value is saved on the all array else if unchecked all the remained meaning they do not matche with the unchecked id is filtered of
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    console.log(checked);
  };

  return (
    <>
      <Jumbo title="Hello Welcome" subTitle="This is my simple ship" />
      {/* <pre>{JSON.stringify({ checked, radio })}</pre> */}
      <div className="container-fluid">
        <div className="row ">
          <div className="col-md-3">
            <h2 className="p-3 mb-2 mt-2 text-center h4 bg-light" >
              Filter By Categories
            </h2>
            <div className="row p-5">
              {categories?.map((c) => (
                <Checkbox
                  
                  key={c._id}
                  onChange={(e) => handleChecked(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h2 className="p-3 mb-2 mt-2 text-center h4 bg-light">
              Filter By Prices
            </h2>
            <div className="row p-5">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.Array} >
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="p-5 pt-0 " >
              <button className="btn btn-outline-danger col-12" onClick={()=>{window.location.reload()}}>RESET</button>
            </div>
          </div>
          <div className="col-md-9">
            <h2 className="p-3 mb-2 mt-2 text-center h4 bg-light">
              {products?.length} available products
            </h2>

            <div className="row" style={{height: "100vh", overflow: 'scroll'}}>
              {products?.map((p) => (
                <div className="col-md-4" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
