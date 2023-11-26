import Jumbo from "../../../components/cards/Jumbo";
import { useAuth } from "../../../context/auth";
import AdminMenu from "../../../components/nav/AdminMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import ProductCardHorizontal from "../../../components/cards/ProductCardHorizontal";
import { Select } from "antd";

//destructure option from status
const { Option } = Select;

export default function Orders() {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [order, setOrder] = useState([]);
  const [status, setstatus] = useState([
    "Not_processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changedStatus, setChangedStatus] = useState("");

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  //function get all orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/all-orders");
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };
  //function Update Status
  const handleChange = async (orderId, value) => {
    setChangedStatus(value);
    try {
      const { data } = await axios.put(`/order-status/${orderId}`, {
        status: value,
      });
      //console.log(data);
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
// };


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
            <div className="p-3 mt-2 mb-2 h5 bg-light"> Orders</div>

            {order?.map((o, index) => {
              return (
                //
                <div
                  key={o._id}
                  className="border shadow bg-light rounded-4 mb-3"
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Ordered</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <Select
                            defaultValue={o?.status}
                            onChange={(value) => {
                              handleChange(o._id, value);
                            }}
                          >
                            {status?.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Successful" : "Failed"}</td>
                        <td>{o?.product.length} products</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    <div className="row mt-2">
                      {o?.product.map((p, i) => (
                        <ProductCardHorizontal key={i} p={p} remove={false} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
