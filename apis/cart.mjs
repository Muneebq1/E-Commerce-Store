import express from "express";
import mongoose from "mongoose";
import { cartProductModel } from "../dbRepo/model.mjs";

const router = express.Router();

router.post("/cart", async (req, res) => {
  const body = req.body;

  if (
    // validation
    !body.name ||
    !body.id ||
    !body.price ||
    !body.quantity ||
    !body.description ||
    !body.pictureUrl
  ) {
    return res.status(400).send({
      message: "required parameters missing",
    });
  }

  try {
    const cartExist = await cartProductModel.exists({
      id: body.id,
      owner: body.token._id,
    });
    if (cartExist) {
      return res.send({
        message: "already exist",
      });
    }
    cartProductModel.create({
      name: body.name,
      price: body.price,
      quantity: body.quantity,
      order: 1,
      id: body.id,
      description: body.description,
      pictureUrl: body.pictureUrl,
      owner: new mongoose.Types.ObjectId(body.token._id),
    });
    return res.status(200).send({
      message: "carts added successfully",
    });
  } catch (error) {
    console.log("cart creation :: ", error);
    return res.status(500).send({
      message: "server error",
    });
  }
});

router.get(
  "/carts",
  async (req, res) => {
    try {
      const UserId = new mongoose.Types.ObjectId(req.body.token._id);
      const carts = await cartProductModel.find({ owner: UserId });
      if (!carts) {
        return res.status(500).send({
          message: "server error",
        });
      }
      return res.send({
        message: "got all carts successfully",
        data: carts,
      });
    } catch (error) {
      console.log("get carts :: ", error);
      return res.status(500).send({
        message: "server error",
      });
    }
  },
  []
);

router.delete("/cart/:id", async (req, res) => {
  try {
    const deleteCart = await cartProductModel.deleteOne(
      { _id: id },
      (err, deletedData)
    );
    if (!deleteCart) {
      return res.status(500).send({
        message: "server error",
      });
    }
    if (deleteCart.deletedCount === 0) {
      return res.status(404).send({
        message: "No cart found with this id: " + id,
      });
    }
    return res.status(200).send({
      message: "cart has been deleted successfully",
    });
  } catch (error) {
    console.log("delete cart :: ", error);
    return res.status(500).send({
      message: "server error",
    });
  }
});

router.put("/cart/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;

  if (!body.order) {
    return res.status(400)
      .send(` required parameter missing. example request body:
      {
        "order": "value",

      }`);
  }
  try {
    let data = await cartProductModel
      .findByIdAndUpdate(
        id,
        {
          order: body.order,
        },
        { new: true }
      )
      .exec();

    console.log("updated: ", data);

    res.send({
      message: "cart modified successfully",
    });
  } catch (error) {
    console.log("edit cart :: ", error);
    return res.status(500).send({
      message: "server error",
    });
  }
});

router.delete("/carts/:owner", async (req, res) => {
  const body = req.body;
  try {
    const deleteAllCarts = await cartProductModel.deleteMany({
      owner: body.token._id,
    });
    if (!deleteAllCarts) {
      return res.status(404).send({
        message: "No carts found with this owner: " + body.token._id,
      });
    }
    if (deleteAllCarts.deletedCount === 0) {
      return res.status(404).send({
        message: "No carts found with this owner: " + body.token._id,
      });
    }
    return res.status(200).send({
      message: "cart has been deleted successfully",
    });

  } catch (error) {
    console.log("delete All carts :: ", error);
    return res.status(500).send({
      message: "server error",
    });
  }
});
export default router;
