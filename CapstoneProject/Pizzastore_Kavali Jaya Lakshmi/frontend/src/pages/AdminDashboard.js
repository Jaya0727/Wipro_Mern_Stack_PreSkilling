import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="container mt-4">

      <h2 className="fw-bold">
        Admin Dashboard
      </h2>

      <ul className="list-group mt-3">

        {/* Menu card */}
        <li className="list-group-item">
          <Link to="/admin/menu">
            Manage Menu
          </Link>
        </li>

        {/* Orders Section */}
        <li className="list-group-item">
          <Link to="/admin/orders">
            Manage Orders
          </Link>
        </li>

        {/* Revenue section */}
        <li className="list-group-item">
          <Link to="/admin/revenue">
            Revenue Report
          </Link>
        </li>

      </ul>

    </div>
  );
}