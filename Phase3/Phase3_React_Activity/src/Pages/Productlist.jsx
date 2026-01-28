import { useEffect, useState } from "react";
import Card from "../components/Card";
import PageTransition from "../transitions/PageTransition";
const Productlist = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then(res => res.json())
      .then(data => setProducts(data));  }, []);

  return (
    <PageTransition>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map(item => (
        <Card
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          image={item.image}
        />
      ))}
    </div>
    </PageTransition>
  );
};

export default Productlist;