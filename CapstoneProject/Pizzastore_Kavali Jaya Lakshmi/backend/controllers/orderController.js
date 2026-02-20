const Order = require("../models/Order");

//Place Order Function
exports.placeOrder = async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      address,
      paymentMethod,
      deliveryMode,
    } = req.body;

    if (!address)
      return res
        .status(400)
        .json("Address required");

    const order = await Order.create({
      userId: req.user.id,
      items,
      totalAmount,
      address,
      paymentMethod,
      deliveryMode,
      status: "Pending",
      timeline: [
        {
          text: "Order Placed",
          time: new Date().toLocaleString(),
        },
      ],
    });

    res.status(201).json(order);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Order placement failed",
    });
  }
};

//Cancel Order
exports.cancelOrder = async (req, res) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      );

    if (!order)
      return res
        .status(404)
        .json("Order not found");

    if (
      order.userId.toString() !==
      req.user.id
    ) {
      return res
        .status(403)
        .json("Unauthorized");
    }

    order.status = "Cancelled";
    order.timeline.push({
      text: "Cancelled",
      time: new Date().toLocaleString(),
    });

    await order.save();
    res.json({
      message: "Order Cancelled",
      order,
    });

  } catch (error) {
    res
      .status(500)
      .json("Cancellation failed");
  }
};

//Get Orders
exports.getOrders = async (req, res) => {
  let orders;
  if (req.user.role === "admin") {
    orders = await Order.find()
      .populate(
        "userId",
        "email"
      );
  } else {
    orders = await Order.find({
      userId: req.user.id,
    });
  }
  res.json(orders);
};

//Update Status
exports.updateStatus = async (req, res) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      );

    if (!order)
      return res
        .status(404)
        .json("Order not found");

    const newStatus = req.body.status;
    order.status = newStatus;
    if (!order.timeline)
      order.timeline = [];
    const lastStep = order.timeline[order.timeline.length - 1];
    
    if (
      !lastStep ||
      lastStep.text !== newStatus
    ) {
      order.timeline.push({
        text: newStatus,
        time:
          new Date().toLocaleString(),
      });
    }
    await order.save();

    //Socket emit
    const io =req.app.get("io");
    io.emit("orderStatusUpdated",
      {
        orderId: order._id,
        status: newStatus,
        userId: order.userId,
      }
    );

    //Auto preparing after order is accepted by the admin
    if (newStatus === "Accepted") {
      setTimeout(async () => {
        const updatedOrder =
          await Order.findById(
            req.params.id
          );
        
        if (!updatedOrder) return;
        updatedOrder.status ="Preparing";
        updatedOrder.timeline.push({
          text: "Preparing",
          time:new Date().toLocaleString(),
        });

        await updatedOrder.save();
        const io = req.app.get("io");
        io.emit(
          "orderStatusUpdated",
          {
            orderId:
              updatedOrder._id,
            status: "Preparing",
            userId:
              updatedOrder.userId,
          }
        );

      }, 15* 60* 1000); //15 min
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(
        "Status update failed"
      );
  }
};

//Revenue
exports.getRevenue = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay =
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0, 0, 0, 0
      );

    const endOfDay =
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23, 59, 59, 999
      );

    const completedStatuses = [
      "Delivered",
      "Picked Up",
    ];

    //Total
    const totalData =
      await Order.aggregate([
        {
          $match: {
            status: {
              $in:
                completedStatuses,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum:
                "$totalAmount",
            },
          },
        },
      ]);

    //Today
    const todayData =
      await Order.aggregate([
        {
          $match: {
            status: {
              $in:
                completedStatuses,
            },
            createdAt: {
              $gte:
                startOfDay,
              $lte:
                endOfDay,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum:
                "$totalAmount",
            },
          },
        },
      ]);

    //Monthly
    const monthly =
      await Order.aggregate([
        {
          $match: {
            status: {
              $in:
                completedStatuses,
            },
          },
        },
        {
          $group: {
            _id: {
              month: {
                $month:
                  "$createdAt",
              },
              year: {
                $year:
                  "$createdAt",
              },
            },
            totalRevenue: {
              $sum:
                "$totalAmount",
            },
            orders: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            "_id.year": -1,
            "_id.month": -1,
          },
        },
      ]);

    res.json({
      totalRevenue:
        totalData[0]?.total || 0,
      todayRevenue:
        todayData[0]?.total || 0,
      monthly,
    });

  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json("Revenue error");
  }
};