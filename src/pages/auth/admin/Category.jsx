import AdminMenu from "../../../components/nav/AdminMenu";
import Jumbo from "../../../components/cards/Jumbo";
import { useAuth } from "../../../context/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../../components/forms/CategoryForm";
import { Modal } from "antd";

export default function Category() {
  //context
  const [auth, setAuth] = useAuth();
  //hook
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatingName, setUpdatingName] = useState("");

  //loading accessing all the categories from the database
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => { 
    try {
      const { data } = await axios.get("/categories");
      // console.log(data);
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  //creating a category
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/category", { name });
      if (data?.error) {
        toast.error(data.error);
      } else {
        loadCategories();
        setName("");
        // console.log(data);
        toast.success(`${data.name} is created`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Creating Category Failed, Try Again");
    }
  };

  //updating Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/category/${selected._id}`, {
        name: updatingName,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        
        setSelected(null);
        setUpdatingName("");
        setVisible(false);
        loadCategories();
        toast.success(`'${data.name}' is updated`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete category
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/category/${selected._id}`);
      if (data.error) {
        toast.error(data.error);
      } else {
        
        setSelected(null);
        setUpdatingName("");
        setVisible(false);
        loadCategories();
        toast.success(`'${data.name}' is Deleted`);
      }
    } catch (error) {
      console.log(error);
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
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h5 bg-light">Manage Category</div>
            <div className="p-3">
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleSubmit}
              />

              <hr />

              <div className="col">
                {category?.map((c) => (
                  <button
                    key={c._id}
                    className=" btn btn-outline-success m-3"
                    onClick={() => {
                      setVisible(true);
                      setSelected(c);
                      setUpdatingName(c.name);
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              {/* Modal ia a third party library for Modal creating pages */}
              <Modal
                open={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
              >
                <CategoryForm
                  value={updatingName}
                  setValue={setUpdatingName}
                  handleSubmit={handleUpdate}
                  buttonText="Update"
                  handleDelete={handleDelete}
                />
              </Modal>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
