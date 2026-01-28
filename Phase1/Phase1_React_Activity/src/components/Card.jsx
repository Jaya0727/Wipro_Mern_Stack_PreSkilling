const Card = ({ title, price }) => {
  return (
    <div className="border rounded-lg p-6 text-center shadow hover:shadow-lg transition">
      <div className="h-32 bg-gray-100 mb-4 flex items-center justify-center">
        Image
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-red-500 font-bold">Price $ {price}</p>
    </div>
  );
};

export default Card;
