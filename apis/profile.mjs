import express from "express";
import mongoose from "mongoose";
import { userModel } from "../dbRepo/model.mjs";
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

router.post("/users", uploadMiddleware.single("profilePic"), (req, res) => {
  const UserId = new mongoose.Types.ObjectId(req.body.id)

  userModel.findOne({owner: UserId}, (err, data) => {
    if (data) {
      try {
        res.send({
          message: "user already exist",
        });
      } catch (error) {
        res.status(500).send({
          message: "server error",
        });
      }
    } else {


  try {
    const body = req.body;

    bucket.upload(
      req.file.path,
      {
        destination: `ProfilePictures/${req.file.filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
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
                userModel.create(
                  {
                    owner: body.id,
                    profilePic: urlData[0],
                  },
                  (err, saved) => {
                    if (!err) {
                      console.log("saved: ", saved);

                      res.send({
                        message: "profile picture added successfully",
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
  
}});
})
router.get(
  "/profile",
  (req, res) => {
    const UserId = new mongoose.Types.ObjectId(req.body.token._id)
    userModel.find({owner: UserId}, (err, data) => {
      if (!err) {
        res.send({
          message: "got picture successfully",
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
