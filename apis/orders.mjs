import express from "express";
import { orderModel } from "../dbRepo/model.mjs";
import mongoose from "mongoose";
const router = express.Router();

router.post("/orders", async (req, res) => {
  const body = req.body;
  if (
    // validation
    !body.name ||
    !body.id ||
    !body.price ||
    !body.quantity ||
    !body.description ||
    !body.order ||
    !body.pictureUrl
  ) {
    return res.status(400).send({
      message: "required parameters missing",
    });
  }

  try {
    const createOrder = await orderModel.create({
      name: body.name,
      price: body.price,
      quantity: body.quantity,
      order: body.order,
      id: body.id,
      description: body.description,
      pictureUrl: body.pictureUrl,
      owner: new mongoose.Types.ObjectId(body.token._id),
    });

    return res.status(200).send({
      message: "order added successfully",
    });
  } catch (error) {
    console.log("create order :: ", error);
    return res.status(500).send({
      message: "server error",
    });
  }
});

router.get(
  "/orders",
  async (req, res) => {
    try {
      const usersOrders = await orderModel.find({}).populate("owner");
      if (!usersOrders) {
        return res.status(500).send({
          message: "server error",
        });
      }
      return res.status(200).send({
        message: "got all usersOrders successfully",
        data: usersOrders,
      });
    } catch (error) {
      console.log("get usersOrders :: ", error);
      return res.status(500).send({
        message: "server error",
      });
    }
  },
  []
);

router.get(
  "/order",
  async (req, res) => {
    const UserId = new mongoose.Types.ObjectId(req.body.token._id);

    try {
      const allOrders = await orderModel.find({ owner: UserId });
      return res.send({
        message: "got user orders successfully",
        data: allOrders,
      });
    } catch (error) {
      console.log("get all orders :: ", error);
      return res.status(500).send({
        message: "server error",
      });
    }
  },
  []
);

export default router;
