import AdminMenu from "../../../components/nav/AdminMenu";
import Jumbo from "../../../components/cards/Jumbo";
import { useAuth } from "../../../context/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
// import Option from Select;

export default function Product() {
  //context
  const [auth, setAuth] = useAuth();
  //hook
  const navigate = useNavigate();
  //state
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [shipping, setShipping] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    loadCategories();
  });

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      // console.log(data);
      setCategories(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const { name, description, price, category, quantity, shipping }
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("photo", photo);
      console.log(productData);

      const { data } = await axios.post("/product", productData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is updated`);
        navigate("/dashboard/admin/products");
      }
      //
    } catch (error) {
      console.log(error);
      toast.error("Could not create product, try again");
    }
  };

  return (
    <>
      <Jumbo
        title={`Welcome ${auth?.user?.name}`}
        subTitle={"Admin Dashboard"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          {/* product image display preveiw */}
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-4 h5 bg-light">Create Products</div>
            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product phot"
                  className="img img-responsive text-center"
                  height="200px"
                />
              </div>
            )}

            {/* upload image to the photo state */}
            <div className>
              <label className="btn btn-outline-secondary col-12 mb-3">
                {photo ? photo.name : "Upload image"}
                <input
                  hidden
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>
            </div>

            {/* input name */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control mb-3 p-2"
              placeholder="Enter product name"
            />

            {/* input description */}
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control mb-3 p-2"
              placeholder="Enter product Description"
            />

            {/* input price */}
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control mb-3 p-2"
              placeholder="Enter Price"
            />

            {/* used andt select to display the categories */}
            <Select
              // showSearch
              bordered={false}
              size="large"
              placeholder="Select category"
              className="form-select mb-3 "
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            {/* shipping */}
            <Select
              bordered={false}
              size="large"
              placeholder="Shipping"
              className="form-select mb-3 "
              onChange={(value) => setShipping(value)}
            >
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>

            {/* input quantity */}
            <input
              min="1"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="form-control mb-3 p-2"
              placeholder="Enter Quantity"
            />
            <button onClick={handleSubmit} className="btn btn-primary mb-5">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
