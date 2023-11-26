import Jumbo from "../../../components/cards/Jumbo";
import { useAuth } from "../../../context/auth";
import UserMenu from "../../../components/nav/UserMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import ProductCardHorizontal from "../../../components/cards/ProductCardHorizontal";

export default function UserOders() {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  //function get all orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/orders");
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Jumbo title={`Welcome ${auth?.user?.name}`} subTitle={"Dashboard"} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h5 bg-light"> Orders</div>

            {order?.map((o, index) => {
              return (
                //
                <div
                  key={o._id}
                  className="border shodow bg-light rounded-4 mb-5"
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
                        <td>{o?.status}</td>
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
                        <ProductCardHorizontal key={i} p={p} remove={false}/>
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
