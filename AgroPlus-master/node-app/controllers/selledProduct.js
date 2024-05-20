const mongoose = require("mongoose");

const SelledProduct = mongoose.model(
  "SelledProduct",
  new mongoose.Schema({
    pname: String,
    pdesc: String,
    price: String,
    category: String,
    images: [String],

    addedBy: mongoose.Schema.Types.ObjectId,
    pLoc: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
      },
    },
  })
);

module.exports.selled = async (req, res) => {
  try {
    const userId = req.body.userId;
    console.log(userId)
    console.log("helo")
    const results = await SelledProduct.find({ addedBy: userId });
    console.log(results);
    res.send({ message: "success", products: results });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "server error" });
  }
};

module.exports.addProduct = async (req, res) => {
  try {
    const { pname, plat, plong, pdesc, price, category, userId } = req.body;

    const productData = {
      pname,
      pdesc,
      price,
      category,
      addedBy: userId,
      pLoc: { type: "Point", coordinates: [plat, plong] },
    };

    const product = new SelledProduct(productData);
    req.body.images.forEach((image, index) => {
      product.images.push(image);
    });

    await product
      .save()
      .then((savedProduct) => {
        // console.log(savedProduct);
        return res.send({ message: "saved success." });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).send({ message: "Internal server error." });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "server error" });
  }
};
