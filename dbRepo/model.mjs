import mongoose from "mongoose";

let productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  quantity: Number,
  description: String,
  pictureUrl: String,
  createdOn: { type: Date, default: Date.now },
});
export const productModel = mongoose.model("products", productSchema);

let cartProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  quantity: Number,
  order: Number,
  id: String ,
  description: String,
  pictureUrl: String,
  owner: {type: mongoose.ObjectId, required: true,},
  createdOn: { type: Date, default: Date.now },
});
export const cartProductModel = mongoose.model("carts", cartProductSchema);


let orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  quantity: Number,
  order: Number,
  id: String ,
  description: String,
  pictureUrl: String,
  owner: {type: mongoose.ObjectId, required: true, ref: 'Users'},
  createdOn: { type: Date, default: Date.now },
});
export const orderModel = mongoose.model("orders", orderSchema);

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, },
  password: { type: String, },
  owner: {type: String},
  profilePic: {type: String,},
  createdOn: { type: Date, default: Date.now },
});
export const userModel = mongoose.model("Users", userSchema);

const mongodbURI =
  process.env.mongodbURI ||
  "mongodb+srv://muneeb:whyitellyou@cluster0.yqmvs2t.mongodb.net/firstdb?retryWrites=true&w=majority";

/////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(mongodbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////

mongoose.connection.on("connected", function () {
  //connected
  console.log("Mongoose is connected");
});

mongoose.connection.on("disconnected", function () {
  //disconnected
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on("error", function (err) {
  //any error
  console.log("Mongoose connection error: ", err);
  process.exit(1);
});

process.on("SIGINT", function () {
  /////this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(function () {
    console.log("Mongoose default connection closed");
    process.exit(0);
  });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
