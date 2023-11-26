import { NavLink } from "react-router-dom";
export default function UserMenu() {
  return (
    <>
      <div className="p-3 mt-2 mb-2 h5 bg-light">User Links</div>
      <ul className="list-group list-unstyled">
        <li>
          <NavLink
            className="list-group-item mt-2 mb-2"
            to={"/dashboard/user/profile"}
          >
            Profile
          </NavLink>
        </li>

        <li>
          <NavLink
            className="list-group-item mt-2 mb-2"
            to={"/dashboard/user/oders"}
          >
            Orders
          </NavLink>
        </li>
      </ul>
    </>
  );
}
