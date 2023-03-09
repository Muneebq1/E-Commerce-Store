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



router.post("/product", uploadMiddleware.single('product'), (req, res) => {
  try {
    const body = req.body;

    if (
      // validation
      !body.name,
      !body.price,
      !body.quantity,
      !body.description,
      !urlData[0]
    ) {
      res.status(400).send({
        message: "required parameters missing",
      });
      return;
    }

    console.log("req.body: ", req.body);
    console.log("req.files: ", req.file);

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
                productModel.create(
                  {
                    name: body.name,
                    price: body.price,
                    quantity: body.quantity,
                    description: body.description,
                    pictureUrl: urlData[0],
                  },
                  (err, saved) => {
                    if (!err) {
                      console.log("saved: ", saved);

                      res.send({
                        message: "product added successfully",
                      });
                    } else {
                      console.log("err: ", err);
                      res.status(500).send({
                        message: "server error",
                      });
                    }
                  }
                );
              }
            });
        } else {
          console.log("err: ", err);
          res.status(500).send();
        }
      }
    );
  } catch (error) {
    console.log("error: ", error);
  }
});


router.get(
  "/products",
  (req, res) => {
    productModel.find({}, (err, data) => {
      if (!err) {
        res.send({
          message: "got all products successfully",
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

router.get("/product/:id", (req, res) => {
  const id = req.params.id;

  productModel.findOne({ _id: id }, (err, data) => {
    if (!err) {
      if (data) {
        res.send({
          message: `get product by id: ${data._id} success`,
          data: data,
        });
      } else {
        res.status(404).send({
          message: "product not found",
        });
      }
    } else {
      res.status(500).send({
        message: "server error",
      });
    }
  });
});

router.delete("/product/:id", (req, res) => {
  const id = req.params.id;

  productModel.deleteOne({ _id: id }, (err, deletedData) => {
    console.log("deleted: ", deletedData);
    if (!err) {
      if (deletedData.deletedCount !== 0) {
        res.send({
          message: "Product has been deleted successfully",
        });
      } else {
        res.status(404);
        res.send({
          message: "No Product found with this id: " + id,
        });
      }
    } else {
      res.status(500).send({
        message: "server error",
      });
    }
  });
});

router.put("/product/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;

  if (!body.name || !body.price || !body.quantity || !body.description) {
    res.status(400).send(` required parameter missing. example request body:
        {
            "name": "value",
            "price": "value",
            "quantity": "value",
            "description": "value"
        }`);
    return;
  }

  try {
    let data = await productModel
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

    console.log("updated: ", data);

    res.send({
      message: "product modified successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "server error",
    });
  }
});

export default router;
