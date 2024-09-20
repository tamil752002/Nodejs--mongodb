const Order = require('../model/orderModel');
const User = require('../model/userModel');
const Product = require('../model/productModel');


const createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;

    // Ensure user exists
    const user1 = await User.find();
    console.log(user1)
    console.log(userId)
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: 'User not found' });

    // Ensure all products exist and validate quantity
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).send({ message: `Product with ID ${item.product} not found` });
      }
    }

    // Create the order
    const order = new Order({
      user: userId,
      products,
      totalAmount,
      orderStatus: 'pending',
    });

    await order.save();

    res.status(201).send({message:'your Order Has been Added In Our Database'});
  } catch (error) {
    res.status(500).send({ message: 'Error creating order', error });
  }
};

// GET: Fetch all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('product');
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching orders', error });
  }
};

// GET: Fetch a single order by ID
 const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('user').populate('product');
    if (!order) return res.status(404).send({ message: 'Order not found' });

    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching order', error });
  }
};

// DELETE: Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).send({ message: 'Order not found' });

    res.status(200).send({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting order', error });
  }
};
module.exports={createOrder,getOrders,getOrderById,deleteOrder}