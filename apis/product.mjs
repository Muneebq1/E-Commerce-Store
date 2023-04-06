import express from "express";
import { productModel } from "../dbRepo/model.mjs";
import multer from "multer";
import bucket from "../firebaseAdmin/index.mjs";
import fs from "fs";

const router = express.Router();

const storageConfig = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    console.log("mul-file: ", file);
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});
var uploadMiddleware = multer({ storage: storageConfig });

router.post(
  "/product",
  uploadMiddleware.single("product"),
  async (req, res) => {
    const body = req.body;

    if (
      // validation
      (!body.name, !body.price, !body.quantity, !body.description, !urlData[0])
    ) {
      return res.status(400).send({
        message: "required parameters missing",
      });
    }
    console.log("req.body: ", req.body);
    console.log("req.files: ", req.file);

    try {
      bucket.upload(
        req.file.path,
        {
          destination: `productPictures/${req.file.filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
        },
        function (err, file, apiResponse) {
          if (!err) {
            file
              .getSignedUrl({
                action: "read",
                expires: "03-09-2999",
              })
              .then((urlData, err) => {
                if (!err) {
                  console.log("public downloadable url: ", urlData[0]); // this is public downloadable url

                  try {
                    fs.unlinkSync(req.file.path);
                    //file removed
                  } catch (err) {
                    console.error(err);
                  }
                }
              });
          }
        }
      );

      const addProduct = await productModel.create({
        name: body.name,
        price: body.price,
        quantity: body.quantity,
        description: body.description,
        pictureUrl: urlData[0],
      });
      if (!addProduct) {
        return res.status(500).send({
          message: "server error",
        });
      }
      return res.status(200).send({
        message: "product added successfully",
      });
    } catch (error) {
      console.log("get all products :: ", error);
      return res.status(500).send({
        message: "server error",
      });
    }
  }
);

router.get(
  "/products",
  async (req, res) => {
    try {
      const allProducts = await productModel.find({});
      res.status(200).send({
        message: "got all products successfully",
        data: allProducts,
      });
    } catch (error) {
      console.log("get all products :: ", error);
      return res.status(500).send({
        message: "server error",
      });
    }
  },
  []
);

// router.get("/product/:id", (req, res) => {
//   const id = req.params.id;

//   productModel.findOne({ _id: id }, (err, data) => {
//     if (!err) {
//       if (data) {
//         res.send({
//           message: `get product by id: ${data._id} success`,
//           data: data,
//         });
//       } else {
//         res.status(404).send({
//           message: "product not found",
//         });
//       }
//     } else {
//       res.status(500).send({
//         message: "server error",
//       });
//     }
//   });
// });

router.delete("/product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteProduct = await productModel.deleteOne({ _id: id });

    if (!deleteProduct) {
      return res.status(500).send({
        message: "server error",
      });
    }
    if (deleteProduct.deletedCount === 0) {
      return res.status(404).send({
        message: "No cart found with this id: " + id,
      });
    }
    return res.status(200).send({
      message: "cart has been deleted successfully",
    });
  } catch (error) {
    console.log("delete product :: ", error);
    return res.status(500).send({
      message: "server error",
    });
  }
});

router.put("/product/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;

  if (!body.name || !body.price || !body.quantity || !body.description) {
    return res.status(400)
      .send(` required parameter missing. example request body:
        {
            "name": "value",
            "price": "value",
            "quantity": "value",
            "description": "value"
        }`);
  }

  try {
    let updateProduct = await productModel
      .findByIdAndUpdate(
        id,
        {
          name: body.name,
          price: body.price,
          quantity: body.quantity,
          description: body.description,
        },
        { new: true }
      )
      .exec();

    console.log("updated: ", updateProduct);

    res.status(200).send({
      message: "product modified successfully",
    });
  } catch (error) {
    console.log("update product :: ", error);
    return res.status(500).send({
      message: "server error",
    });
  }
});

export default router;
