import express from 'express';
import {productModel} from '../dbRepo/model.mjs'
import multer from 'multer';

const router = express.Router()


// const storageConfig = multer.diskStorage({
//     destination: './uploads/',
//     filename: function (req, file, cb) {

//         console.log("mul-file: ", file);
//         cb(null, `${new Date().getTime()}-${file.originalname}`)
//     }
// })
// let uploadMiddleware = multer({ storage: storageConfig })


router.post('/product',  (req, res) => {

    const body = req.body;

    if ( // validation
        !body.name
        || !body.price
        || !body.quantity
        || !body.description
    ) {
        res.status(400).send({
            message: "required parameters missing",
        });
        return;
    }

    productModel.create({
        name: body.name,
        price: body.price,
        quantity: body.quantity,
        description: body.description,
        // owner: new mongoose.Types.ObjectId(body.token._id)
    },
        (err, saved) => {
            if (!err) {
                console.log(saved );

                res.send({
                    message: "product added successfully"
                });
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })
})

router.get('/products', (req, res) => {
    productModel.find({},
        (err, data) => {
        if (!err) {
            res.send({
                message: "got all products successfully",
                data: data
            })
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
}, [])

router.get('/product/:id', (req, res) => {

    const id = req.params.id;

    productModel.findOne({ _id: id }, (err, data) => {
        if (!err) {
            if (data) {
                res.send({
                    message: `get product by id: ${data._id} success`,
                    data: data
                });
            } else {
                res.status(404).send({
                    message: "product not found",
                })
            }
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

router.delete('/product/:id', (req, res) => {
    const id = req.params.id;

    productModel.deleteOne({ _id: id }, (err, deletedData) => {
        console.log("deleted: ", deletedData);
        if (!err) {

            if (deletedData.deletedCount !== 0) {
                res.send({
                    message: "Product has been deleted successfully",
                })
            } else {
                res.status(404);
                res.send({
                    message: "No Product found with this id: " + id,
                });
            }
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });

})

router.put('/product/:id', async (req, res) => {

    const body = req.body;
    const id = req.params.id;

    if (
        !body.name ||
        !body.price ||
        !body.quantity ||
        !body.description
    ) {
        res.status(400).send(` required parameter missing. example request body:
        {
            "name": "value",
            "price": "value",
            "quantity": "value",
            "description": "value"
        }`)
        return;
    }

    try {
        let data = await productModel.findByIdAndUpdate(id,
            {
                name: body.name,
                price: body.price,
                quantity: body.quantity,
                description: body.description
            },
            { new: true }
        ).exec();

        console.log('updated: ', data);

        res.send({
            message: "product modified successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: "server error"
        })
    }
})


export default router