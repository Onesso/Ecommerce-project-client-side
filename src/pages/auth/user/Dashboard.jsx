import Jumbo from "../../../components/cards/Jumbo";
import { useAuth } from "../../../context/auth";
import UserMenu from "../../../components/nav/UserMenu";

export default function userDashboard() {
  //context
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Jumbo title={`Welcome ${auth?.user?.name}`} subTitle={"Dashboard"} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h5 bg-light"> information</div>
            <ul className="list-group list-unstyled">
              <li className="list-group-item">{auth?.user?.name}</li>
              <li className="list-group-item">{auth?.user?.email}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
