
const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      default: 'pending',  // You can also use enums to restrict status values
    },
  }, { timestamps: true });
  
  const Order = mongoose.model('Order', orderSchema);
  
  module.exports = Order;
  