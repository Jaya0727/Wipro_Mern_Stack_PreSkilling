const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const {placeOrder,getOrders,updateStatus,getRevenue} = require( "../controllers/orderController");

//for user to place order
router.post("/",auth,placeOrder);

//Admin to view orders
router.get("/",auth,getOrders);

//admin- update orders
router.put(
  "/:id",
  auth,
  updateStatus
);
//Admin revenue report
router.get("/revenue",auth,isAdmin,getRevenue);
//Cancel order - user
router.put("/cancel/:id",auth,
  async (req, res) => {
    try {
      const Order = require("../models/Order");
      const order = await Order.findById(req.params.id);
      if (!order)
        return res.status(404)
         .json("Order not found");

      // Only owner can cancel
      if (
        order.userId.toString() !== req.user.id
      ) {
        return res
          .status(403)
          .json("Not allowed");
      }
      // Only pending can cancel
      if (
        order.status !== "Pending"
      ) {
        return res
          .status(400)
          .json(
            "Cannot cancel now"
          );
      }
      order.status = "Cancelled";

      // Tracker update
      order.timeline.push({
        text: "Cancelled",
        time:new Date().toLocaleString(),
      });
      await order.save();
      res.json(order);
    } catch {
      res
        .status(500)
        .json(
          "Cancel failed"
        );
    }
  }
);

//get bill for each order
router.get(
  "/:id",
  auth,
  async (req, res) => {
    try {
      const Order = require("../models/Order");
      const order = await Order.findById(req.params.id);
      if (!order)
        return res
          .status(404)
          .json("Order not found");
      res.json(order);
    } 
    catch (error) {
      res
        .status(500)
        .json("Bill fetch failed");

    }
  }
);
module .exports = router;