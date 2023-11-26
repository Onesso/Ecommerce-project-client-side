import AdminMenu from "../../../components/nav/AdminMenu";
import Jumbo from "../../../components/cards/Jumbo";
import { useAuth } from "../../../context/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;
// import Option from Select;

export default function ProductUpdate() {
  const REACT_APP_API = "http://localhost:8000/api"; //this is the server endpoint

  //context
  const [auth, setAuth] = useAuth();
  //hook
  const navigate = useNavigate();
  const params = useParams();

  //   //state
  //   const [categories, setCategories] = useState([]);
  //   const [name, setName] = useState("");
  //   const [photo, setPhoto] = useState("");
  //   const [quantity, setQuantity] = useState("");
  //   const [category, setCategory] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [shipping, setShipping] = useState("");
  //   const [price, setPrice] = useState("");
  //   const [id, setId] = useState("");

  //checking
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      //   console.log(data);
      setCategories(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      console.log(data);

      //populating data for autofill

      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setCategory(data.category);
      setShipping(data.shipping);
      setQuantity(data.quantity);
      setId(data._id);
    } catch (error) {
      console.log(error);
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
      photo && productData.append("photo", photo);
      //   console.log(productData);

      const { data } = await axios.put(`/product/${id}`, productData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is updated`);
        navigate("/dashboard/admin/products");
      }
      //
    } catch (error) {
      console.log(error);
      toast.error("Could not update, try again");
    }
  };

  const handleDelete = async (req, res) => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );

      if (!answer) return;

      const { data } = await axios.delete(`/product/${id}`);
      toast.success(`'${data.name}' you have successful deleted`);
      navigate(-1);//back to the previous page
      
    } catch (error) {
      console.log(error);
      toast.error("can not delete, try again");
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

            {photo ? (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product phot"
                  className="img img-responsive text-center"
                  height="200px"
                />
              </div>
            ) : (
              <div>
                {/* taking photo from the database to populate the form */}
                <div className="text-center">
                  <img
                    src={`${REACT_APP_API}/product/photo/${id}?${new Date().getTime()}`}
                    alt="product phot"
                    className="img img-responsive text-center"
                    height="200px"
                  />
                </div>
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
              className="form-control mb-3 p-2"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* input description */}
            <textarea
              className="form-control mb-3 p-2"
              placeholder="Enter product Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* input price */}
            <input
              type="number"
              className="form-control mb-3 p-2"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            {/* used andt select to display the categories */}
            <Select
              // showSearch
              bordered={false}
              size="large"
              placeholder="Select category"
              className="form-select mb-3 "
              onChange={(value) => setCategory(value)}
              value={category}
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
              value={shipping ? "Yes" : "No"}
            >
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>

            {/* input quantity */}
            <input
              min="1"
              type="number"
              className="form-control mb-3 p-2"
              placeholder="Enter Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <div className="d-flex justify-content-between">
              <button onClick={handleSubmit} className="btn btn-primary mb-5">
                Update
              </button>
              <button onClick={handleDelete} className="btn btn-danger mb-5">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
