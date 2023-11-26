import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search.jsx";
import useCategory from "../../hooks/useCategory.jsx";
import { useCart } from "../../context/Cart.jsx";
import { Badge } from "antd";

export default function Menu() {
  //context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  //state
  const navigate = useNavigate();
  const categories = useCategory();

  // console.log(categories);

  const logout = () => {
    setAuth({ ...auth, token: "", user: null });
    localStorage.removeItem("auth");
    navigate("/Login");
  };
  return (
    <>
      <div style={{ background: "green" }}>
        <ul className="nav d-flex justify-content-center shadow-sm mb-2 sticky-top bg-light align-items-center">
          {/*have a fixed nav bar and prevent the jumbo from overflowing into the nav bar */}
          <li className="nav-item mt-2">
            <NavLink className="nav-link " aria-current="page" to="/">
              HOME
            </NavLink>
          </li>

          <div className="dropdown" style={{marginRight: "0px"}}>
            <li>
              <a
                className="m-2 nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                CATEGORY
              </a>

              <ul
                className="dropdown-menu"
                style={{ height: "200px", width: "215px", overflow: "scroll" }}
              >
                {categories.map((c) => (
                  <li key={c._id}>
                    <NavLink className="nav-link" to={`/category/${c.slug}`}>
                      {c.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </div>
          <Search />
          <li className="nav-item mt-2">
            <NavLink className="nav-link " aria-current="page" to="/Shop">
              SHOP
            </NavLink>
          </li>

          <li className="nav-item mt-2">
            <Badge count={cart?.length || 0} offset={[-5, 15]} showZero={true}>
              <NavLink className="nav-link " aria-current="page" to="/Cart">
                CART
              </NavLink>
            </Badge>
          </li>
          {/* used ternanry operatot to display the login and register if the there is not any authenticated user */}
          {!auth?.user ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Login">
                  LOGIN
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Register">
                  REGISTER
                </NavLink>
              </li>
            </>
          ) : (
            <div className="dropdown">
              <li>
                <a
                  className="m-2 nav-link pointer dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  {auth?.user?.name.toUpperCase()}
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="nav-link"
                      to={`/Dashboard/${
                        auth?.user?.user === 1 ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </NavLink>
                  </li>

                  <li className="nav-item pointer">
                    <a onClick={logout} className="nav-link">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </div>
          )}
        </ul>
      </div>
    </>
  );
}
