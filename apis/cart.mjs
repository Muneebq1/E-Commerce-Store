import express from "express";
import { cartProductModel } from "./../dbRepo/model.mjs";

const router = express.Router();

router.post("/cart", (req, res) => {
  const body = req.body;
  if (
    // validation
    !body.name ||
    !body.price ||
    !body.description
  ) {
    res.status(400).send({
      message: "required parameters missing",
    });
    return;
  }

  cartProductModel.create(
    {
      name: body.name,
      price: body.price,
      description: body.description,
      // owner: new mongoose.Types.ObjectId(body.token._id)
    },
    (err, saved) => {
      if (!err) {
        console.log(saved);

        res.send({
          message: "product added successfully",
        });
      } else {
        res.status(500).send({
          message: "server error",
        });
      }
    }
  );
});

export default router;
