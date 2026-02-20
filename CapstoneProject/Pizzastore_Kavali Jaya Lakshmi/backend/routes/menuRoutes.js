const router = require("express").Router();
const MenuItem = require("../models/MenuItem");
const menuController = require("../controllers/menuController");
const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

//To get all menu items
router.get("/", menuController.getAllMenu);

//Search
router.get("/search",menuController.searchMenu);

//Category 
router.get("/:category", menuController.getByCategory);

//Admin Crud Operations 
router.post( "/",auth,isAdmin, // post- to add item
  async (req, res) => {
    const item =
      await MenuItem.create(req.body);
    res.json(item);
  }
);
 // put - to edit item
router.put(
  "/:id",
  auth,
  isAdmin,
  async (req, res) => {
    const updated =
      await MenuItem.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
    res.json(updated);
  }
);
// to delete item
router.delete(
  "/:id",
  auth,
  isAdmin,
  async (req, res) => {
    await MenuItem.findByIdAndDelete(
      req.params.id
    );
    res.json({ message: "Deleted" });
  }
);

module.exports = router;