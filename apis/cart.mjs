import express from "express";
import { cartProductModel } from "../dbRepo/model.mjs";

const router = express.Router();

router.post("/cart", async (req, res) => {
  const body = req.body;
  // const id = req.params.id;

  if (
    // validation
    !body.name ||
    !body.id ||
    !body.price ||
    !body.quantity ||
    !body.description ||
    !body.pictureUrl
  ) {
    res.status(400).send({
      message: "required parameters missing",
    });
    return;
  }

  cartProductModel.findOne({ id: body.id }, (err, data) => {
    if (data) {
      const id = body._id
      try {
        cartProductModel
          .findByIdAndUpdate(
            id,
            {
              order: 1,
            },
            { new: true }
          )
          .exec();

        console.log("updated: ", data);

        res.send({
          message: "order added successfully",
        });
      } catch (error) {
        res.status(500).send({
          message: "server error",
        });
      }
    } else {
      cartProductModel.create(
        {
          name: body.name,
          price: body.price,
          quantity: body.quantity,
          order: 1,
          id: body.id,
          description: body.description,
          pictureUrl: body.pictureUrl,
          // owner: new mongoose.Types.ObjectId(body.token._id)
        },
        (err, saved) => {
          if (!err) {
            // console.log(saved);

            res.send({
              message: "carts added successfully",
            });
          } else {
            res.status(500).send({
              message: "server error",
              error: err,
            });
          }
        }
      );
    }
  });
});

router.get(
  "/carts",
  (req, res) => {
    cartProductModel.find({}, (err, data) => {
      if (!err) {
        res.send({
          message: "got all carts successfully",
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

router.delete("/cart/:id", (req, res) => {
  const id = req.params.id;

  cartProductModel.deleteOne({ _id: id }, (err, deletedData) => {
    console.log("deleted: ", deletedData);
    if (!err) {
      if (deletedData.deletedCount !== 0) {
        res.send({
          message: "cart has been deleted successfully",
        });
      } else {
        res.status(404);
        res.send({
          message: "No cart found with this id: " + id,
        });
      }
    } else {
      res.status(500).send({
        message: "server error",
      });
    }
  });
});

router.put("/cart/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;

  if (!body.order) {
    res.status(400).send(` required parameter missing. example request body:
      {
        "order": "value",

      }`);
    return;
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
      // message: "order modified successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "server error",
    });
  }
});

export default router;
