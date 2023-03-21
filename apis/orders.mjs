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
    res.status(400).send({
      message: "required parameters missing",
    });
    return;
  }
      orderModel.create(
        {
          name: body.name,
          price: body.price,
          quantity: body.quantity,
          order: body.order,
          id: body.id,
          description: body.description,
          pictureUrl: body.pictureUrl,
          owner: new mongoose.Types.ObjectId(body.token._id),
        },
        (err, saved) => {
          if (!err) {
            // console.log(saved);

            res.send({
              message: "order added successfully",
            });
          } else {
            res.status(500).send({
              message: "server error",
              error: err,
            });
          }
        }
      );
  });

router.get(
  "/orders",
  (req, res) => {
    orderModel
      .find({})
      .populate("owner") // multiple path names in one requires mongoose >= 3.6
      .exec((err, data) => {
        if (!err) {
          res.send({
            message: "got all orders successfully",
            data: data,
          });
        } else {
          res.status(500).send({
            message: "server error",
          });
        }
      });
  },
  []
);


router.get(
  "/order",
  (req, res) => {
    const UserId = new mongoose.Types.ObjectId(req.body.token._id)
    orderModel.find({owner: UserId}, (err, data) => {
      if (!err) {
        res.send({
          message: "got user orders successfully",
          data: data,
        });
      } else {
        res.status(500).send({
          message: "server error",
        });
      }
    });
  },
  []
);
export default router;
