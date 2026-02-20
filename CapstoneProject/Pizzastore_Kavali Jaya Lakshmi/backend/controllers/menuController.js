const Menu = require("../models/MenuItem");

//Get menu 
exports.getAllMenu = async (req, res) => {
  const items = await Menu.find();
  res.json(items);
};

//To get category of items
exports.getByCategory = async (req, res) => {
  const items = await Menu.find({
    category: req.params.category,
  });
  res.json(items);
};

//Search
exports.searchMenu = async (req, res) => {
  try {
    const q = req.query.q || "";
    const items = await Menu.find({
      name: {
        $regex: q,
        $options: "i",
      },
    }).limit(8);
    res.json(items);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json("Search failed");
  }
};