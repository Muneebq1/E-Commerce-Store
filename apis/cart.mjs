import express from "express";
import { cartProductModel } from "../dbRepo/model.mjs";

const router = express.Router();

router.post("/cart", (req, res) => {
  const body = req.body;
  console.log(body)
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
  console.log({body})
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
          message: "carts added successfully",
        });
      } else {
        res.status(500).send({
          message: "server error",
          error: err
        });
      }
    }
  );
});

router.get('/carts', (req, res) => {
    cartProductModel.find({},
        (err, data) => {
        if (!err) {
            res.send({
                message: "got all carts successfully",
                data: data
            })
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
}, [])

router.delete('/cart/:id', (req, res) => {
  const id = req.params.id;

  cartProductModel.deleteOne({ _id: id }, (err, deletedData) => {
      console.log("deleted: ", deletedData);
      if (!err) {

          if (deletedData.deletedCount !== 0) {
              res.send({
                  message: "cart has been deleted successfully",
              })
          } else {
              res.status(404);
              res.send({
                  message: "No cart found with this id: " + id,
              });
          }
      } else {
          res.status(500).send({
              message: "server error"
          })
      }
  });

})





export default router;
