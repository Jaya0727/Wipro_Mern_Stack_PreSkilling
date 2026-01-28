import { useState } from "react";

const Mainpart = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <section className="bg-gray-400 py-20 text-center"
      style={{
    backgroundImage: "url('/Images/Banner.jpg')"
  }}>
      <h2 className="text-4xl text-white font-bold mb-4">GET START</h2>
      <h1 className="text-5xl text-white font-extrabold mb-6">
        YOUR FAVORITE SHOPPING
      </h1>

      <button
        onClick={handleClick}
        className={`px-6 py-3 rounded text-white transition-all duration-300 ${
          isClicked ? "bg-green-600" : "bg-gray-800"
        }`}
      >
        BUY NOW
      </button>
    </section>
  );
};

export default Mainpart;
