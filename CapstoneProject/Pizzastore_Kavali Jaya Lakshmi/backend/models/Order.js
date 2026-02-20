const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    userId: { type:mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: [
      {
        name: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],
    totalAmount: Number,
    //Adress
    address: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      pincode: String,
    },

    //Payment
    paymentMethod: String,
    
    //Delivery
    deliveryMode:{
      type:String,
      default:"Home Delivery"
    },

    status: {
      type: String,
      default: "Pending",
    },

    //Tracking
    timeline: [
      {
        text: String,
        time: String,
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },

  });

module.exports =mongoose.model(
    "Order",
    orderSchema
  );