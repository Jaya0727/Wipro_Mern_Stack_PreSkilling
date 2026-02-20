import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  //User
  const user = JSON.parse(localStorage.getItem("user"));
  //Cart Context
  const { cart } = useContext(CartContext);
  const [showMenu, setShowMenu] = useState(false);
  //Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger shadow-sm">
      <div className="container">
        {/*Logo*/}
        <Link className="navbar-brand d-flex align-items-center fw-bold fs-4" to="/">
        <img src="/assets/logo.png" alt="logo"
     style={{
      width: "40px",
      height: "40px",
      marginRight: "20px",
      borderRadius:"50%",
      objectFit: "cover"
    }}
    /> Pizzeriaa
       </Link>
        <div className="ms-auto d-flex align-items-center">
          {/*Home*/}
          <Link
            className="nav-link d-inline text-white me-3" to="/"> Home
          </Link>

          {/*Cart*/}
          {user && user.role !== "admin" && (
          <div className="position-relative me-3">
            <Link
              className="nav-link d-inline text-white me-3 position-relative" to="/cart">
              Cart({cart.length })
          </Link>
          </div>
          )}

          {/*My Orders*/}
          {user && user.role !== "admin" &&(
            <Link
              className="nav-link d-inline text-white me-3" to="/my-orders">
              My Orders
            </Link>
          )}

          {user ? (
            <div className="position-relative">
              <span
                className="nav-link d-inline text-white me-2"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setShowMenu(!showMenu)
                }
              >
                {user.name}
              </span>

              {showMenu && (
                <div 
                className="position-absolute bg-white shadow rounded p-2"
                  style={{
                    right: 0,
                    top: "40px",
                    minWidth: "140px",
                    zIndex: 1000,
                  }}
                >
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              className="nav-link d-inline text-white" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}