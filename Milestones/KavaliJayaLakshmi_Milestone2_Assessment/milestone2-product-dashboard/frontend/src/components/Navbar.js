import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Product App
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Products
          </Link>
          <Link className="nav-link" to="/add">
            Add Product
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
