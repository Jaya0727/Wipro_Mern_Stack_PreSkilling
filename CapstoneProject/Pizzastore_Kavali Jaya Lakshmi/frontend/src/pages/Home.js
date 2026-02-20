import { useEffect, useState, useContext } from "react";
import PizzaCard from "../components/PizzaCard";
import { CartContext } from "../context/CartContext";

export default function Home() {

  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [suggestions, setSuggestions] = useState([]);

  //Scroll function
  const scrollToBestSellers = () => {
    const section = document.getElementById("best-sellers");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // Fetch menu
  useEffect(() => {
    const fetchMenu = async () => {
      const res = await fetch(
        "http://localhost:5000/api/menu"
      );
      const data = await res.json();
      setMenu(data);
    };

    fetchMenu();
  }, []);

  //Search
  useEffect(() => {
    if (search.length === 0) {
      setSuggestions([]);
      return;
    }
    const fetchSuggestions = async () => {
      const res = await fetch(
        `http://localhost:5000/api/menu/search?q=${search}`
      );
      const data = await res.json();
      setSuggestions(data);
    };
    fetchSuggestions();
  }, [search]);

  //menu fiter logic
  const filteredMenu = menu.filter((item) => {
    const matchSearch =
      item.name
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchCategory =
      category === "all"
        ? true
        : item.category === category;

    return matchSearch && matchCategory;
  });

  //categories
  const vegPizzas = filteredMenu.filter(
    (i) => i.category === "pizza" && i.type === "veg"
  );
  const nonVegPizzas = filteredMenu.filter(
    (i) =>
      i.category === "pizza" &&
      i.type === "non-veg"
  );
  const beverages = filteredMenu.filter(
    (i) => i.category === "beverages"
  );
  const sides = filteredMenu.filter(
    (i) => i.category === "sides"
  );
  const bestSellers = filteredMenu.filter(
    (i) => i.isBestSeller
  );
  const newLaunch = filteredMenu.filter(
    (i) => i.isNewLaunch
  );

  return (
    <div className="container mt-4">
      {/*Search by category */}
      <div className="row mb-4">
        <div className="col-md-8 position-relative">
          <input
            type="text"
            className="form-control"
            placeholder="Search pizzas..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {/* search suggestions*/}
          {suggestions.length > 0 && (
            <div
              className="list-group position-absolute w-100 shadow"
              style={{ zIndex: 999 }}
            >
              {suggestions.map((s) => (
                <button
                  key={s._id}
                  className="list-group-item list-group-item-action"
                  onClick={() => {
                    setSearch(s.name);
                    setSuggestions([]);
                  }}
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="all">All</option>
            <option value="pizza">Pizza</option>
            <option value="sides">Sides</option>
            <option value="beverages">Beverages</option>
          </select>
        </div>
      </div>

      {/*Hero section-top*/}
      <div className="hero-banner">
        <div className="hero-overlay">
          <div className="hero-text">
            <h1>
              Pizzeria serves Delicious
              and Hot Pizzas Just for You
            </h1>
            <p>MORE TOPPINGS</p>
            <button
              className="btn btn-danger btn-lg mt-3"
              onClick={scrollToBestSellers}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/*Best Sellers*/}
      <div id="best-sellers" className="best-seller-heading">
        <h2>Best Sellers</h2>
      </div>
      <Row data={bestSellers} />

      {/*Newly Added*/}
      <div className="newly-added-heading">
        <h2>Newly Added</h2>
      </div>
      <Row data={newLaunch} />

      {/*Veg*/}
      <div className="veg-section-heading">
        <h2>Veg Pizzas</h2>
      </div>
      <Row data={vegPizzas} />

      {/*Non veg*/}
      <div className="nonveg-section-heading">
        <h2>Non-Veg Pizzas</h2>
      </div>
      <Row data={nonVegPizzas} />

      {/*Sides*/}
      <div className="sides-section-heading">
        <h2>Sides</h2>
      </div>
      <Row data={sides} />

      {/* Beverages*/}
      <div className="beverages-section-heading">
        <h2>Beverages</h2>
      </div>
      <Row data={beverages} />
    </div>
  );
}

//Row Component
function Row({ data }) {
  const { addToCart } = useContext(CartContext);
  if (data.length === 0) return null;
  return (
    <div className="scroll-container">
      {data.map((item) => (
        <div
          className="scroll-card"
          key={item._id}
        >
          <PizzaCard item={item} add={addToCart} />
        </div>
      ))}
    </div>
  );
}