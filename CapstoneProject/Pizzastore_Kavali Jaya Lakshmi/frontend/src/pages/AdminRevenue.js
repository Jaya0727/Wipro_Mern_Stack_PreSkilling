import { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";

export default function AdminRevenue() {

const [revenue, setRevenue] = useState(null);
const [selectedMonth, setSelectedMonth] = useState("");
const [selectedYear, setSelectedYear] = useState("");

useEffect(() => {
const fetchRevenue = async () => {
try {
const token = localStorage.getItem("token");
    const res = await fetch(
      "http://localhost:5000/api/orders/revenue",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setRevenue(data);
  } catch (err) {
    console.error(err);
  }
};
fetchRevenue();
}, []);
if (!revenue)
return (
<h3 className="text-center mt-5">
Loading Revenue...
</h3>
);

//Filter Logic
const filteredMonthly = revenue.monthly.filter((m) => {
if (!selectedMonth && !selectedYear) return true;
if (selectedMonth && selectedYear) {
  return (
    m._id.month === Number(selectedMonth) &&
    m._id.year === Number(selectedYear)
  );
}
if (selectedMonth) {
  return m._id.month === Number(selectedMonth);
}
if (selectedYear) {
  return m._id.year === Number(selectedYear);
}

return true;

});

const years = [
...new Set(
revenue.monthly.map((m) => m._id.year)
),
];

return (
<div className="container mt-4">

  <h2 className="fw-bold mb-4">
    Revenue Dashboard
  </h2>

  <div className="row g-4">
    <div className="col-md-4">
      <div className="card shadow text-center p-4 border-0">
        <h6>Total Revenue</h6>
        <h2 className="text-success">
          <FaRupeeSign/>{revenue.totalRevenue}
        </h2>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card shadow text-center p-4 border-0">
        <h6>Today's Revenue</h6>
        <h2 className="text-primary">
          <FaRupeeSign/>{revenue.todayRevenue}
        </h2>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card shadow text-center p-4 border-0">
        <h6>Months Recorded</h6>
        <h2>
          {revenue.monthly.length}
        </h2>
      </div>
    </div>

  </div>

  <div className="card shadow mt-5 p-4 border-0">
    <h5 className="mb-4">
      Monthly Performance
    </h5>

    <div className="row mb-3">
      <div className="col-md-3">
        <select
          className="form-control"
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(e.target.value)
          }
        >
          <option value="">
            All Months
          </option>

          {[
            "Jan","Feb","Mar","Apr",
            "May","Jun","Jul","Aug",
            "Sep","Oct","Nov","Dec"
          ].map((m, i) => (
            <option
              key={i}
              value={i + 1}
            >
              {m}
            </option>
          ))}

        </select>
      </div>

      <div className="col-md-3">
        <select
          className="form-control"
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(e.target.value)
          }
        >
          <option value="">
            All Years
          </option>

          {years.map((y, i) => (
            <option key={i}>
              {y}
            </option>
          ))}

        </select>
      </div>
    </div>

    {filteredMonthly.length === 0 ? (
      <p className="text-muted">
        No data for selected filter.
      </p>
    ) : (
      filteredMonthly.map((m, i) => (
        <div
          key={i}
          className="d-flex justify-content-between border-bottom py-2">
          <span>
            {m._id.month}/{m._id.year}
          </span>

          <span>
            Orders: {m.orders}
          </span>

          <span className="fw-bold text-success">
            <FaRupeeSign/>{m.totalRevenue}
          </span>

        </div>
      ))
    )}
  </div>
</div>
);
}