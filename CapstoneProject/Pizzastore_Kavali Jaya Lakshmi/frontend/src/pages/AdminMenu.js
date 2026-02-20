import { useEffect, useState } from "react";

export default function AdminMenu() {

  const [menu, setMenu] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "pizza",
    type: "veg",
    price: "",
    image: "",
    isBestSeller: false,
    isNewLaunch: false,
  });

  const token = localStorage.getItem("token");

  //fetch menu
  const fetchMenu = async () => {
    const res = await fetch(
      "http://localhost:5000/api/menu"
    );
    const data = await res.json();
    setMenu(data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  //Add/Update menu
  const submitItem = async () => {
    const url = editId
      ? `http://localhost:5000/api/menu/${editId}`
      : "http://localhost:5000/api/menu";
    const method = editId ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    alert(editId ? "Item Updated" : "Item Added");
    setEditId(null);
    setForm({
      name: "",
      category: "pizza",
      type: "veg",
      price: "",
      image: "",
      isBestSeller: false,
      isNewLaunch: false,
    });

    fetchMenu();
  };

  //Delete item
  const deleteItem = async (id) => {
    await fetch(
      `http://localhost:5000/api/menu/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    alert("Deleted");
    fetchMenu();
  };

  //Edit
  const editItem = (item) => {
    setEditId(item._id);
    setForm(item);
  };
  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">
        Manage Menu
      </h2>

      {/*Form*/}
      <div className="card p-3 mb-4">
        <h5>
          {editId ? "Edit Item" : "Add Item"}
        </h5>

        <input
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <select
          className="form-control mb-2"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          <option value="pizza">Pizza</option>
          <option value="sides">Sides</option>
          <option value="beverages">Beverages</option>
        </select>

        <select
          className="form-control mb-2"
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        >
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={form.isBestSeller}
            onChange={(e) =>
              setForm({
                ...form,
                isBestSeller: e.target.checked,
              })
            }
          />
          <label>Best Seller</label>
        </div>

        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            checked={form.isNewLaunch}
            onChange={(e) =>
              setForm({
                ...form,
                isNewLaunch: e.target.checked,
              })
            }
          />
          <label>New Launch</label>
        </div>

        <button
          className="btn btn-success"
          onClick={submitItem}
        >
          {editId ? "Update Item" : "Add Item"}
        </button>

      </div>

      {/*Menu list*/}
      <div className="row">
        {menu.map((item) => (
          <div
            className="col-md-3 mb-4"
            key={item._id}
          >
            <div className="card p-2">

              <img
                src={item.image}
                height="150"
                style={{ objectFit: "cover" }}
                alt=""
              />

              <h6 className="mt-2">
                {item.name}
              </h6>

              <p>₹{item.price}</p>

              <button
                className="btn btn-primary btn-sm me-2"
                onClick={() => editItem(item)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                  deleteItem(item._id)
                }
              >
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}