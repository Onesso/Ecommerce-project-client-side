import Jumbo from "../../../components/cards/Jumbo";
import { useAuth } from "../../../context/auth";
import AdminMenu from "../../../components/nav/AdminMenu";

export default function adminDashboard() {
  //context
  const [auth, setAuth] = useAuth();
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
            <div className="p-3 mt-2 mb-2 h5 bg-light">Admin information</div>
            <ul className="list-group list-unstyled">
              <li className="list-group-item">{auth?.user?.name}</li>
              <li className="list-group-item">{auth?.user?.email}</li>
              <li className="list-group-item">admin</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
