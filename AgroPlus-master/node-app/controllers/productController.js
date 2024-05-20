const mongoose = require("mongoose");

const Products = mongoose.model(
  "Products",
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

Products.schema.index({ pLoc: "2dsphere" });

module.exports.search = async (req, res) => {
  try {
    const { loc, search } = req.query;
    // const [latitude, longitude] = loc.split(",");

    const results = await Products.find({
      $or: [
        { pname: { $regex: search, $options: "i" } },
        { pdesc: { $regex: search, $options: "i" } },
        { price: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
      // pLoc: {
      //   $near: {
      //     $geometry: {
      //       type: "Point",
      //       coordinates: [parseFloat(latitude), parseFloat(longitude)],
      //     },
      //     $maxDistance: 500 * 1000,
      //   },
      // },
    });

    res.send({ message: "success", products: results });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "server error" });
  }
};

module.exports.addProduct = async (req, res) => {
  try {
    const images = [];
    const { pname, plat, plong, pdesc, price, category, userId } = req.body;
    Object.keys(req.files).forEach((key) => {
      images.push(req.files[key][0].path);
    });

    const productData = {
      pname,
      pdesc,
      price,
      category,
      addedBy: userId,
      pLoc: { type: "Point", coordinates: [plat, plong] },
    };

    const product = new Products(productData);
    images.forEach((image, index) => {
      // productData[`pimage${index + 1}`] = image;
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

module.exports.editProduct = async (req, res) => {
  try {
    const images = [];
    const { id } = req.params;
    const { pname, plat, plong, pdesc, price, category, userId } = req.body;
    Object.keys(req.files).forEach((key) => {
      images.push(req.files[key][0].path);
    });
    // console.log(images);
    const data = await Products.findOneAndUpdate(
      { _id: id },
      { pname, plat, plong, pdesc, price, category, userId }
    );
    images.forEach((image, index) => {
      data.images.push(image);
    });
    await data.save();
    res.send({ message: "updated success." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "server error" });
  }
};

module.exports.getProducts = async (req, res) => {
  try {
    const catName = req.query.category; // Update query parameter name
    let filter = {};

    if (catName) {
      filter = { category: catName };
    }

    const results = await Products.find(filter);
    res.send({ message: "success", products: results });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "server error" });
  }
};

module.exports.getProductsById = async (req, res) => {
  try {
    const result = await Products.findOne({ _id: req.params.pId });
    res.send({ message: "success", product: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "server error" });
  }
};

module.exports.myProducts = async (req, res) => {
  try {
    const userId = req.body.userId;
    const results = await Products.find({ addedBy: userId });
    res.send({ message: "success", products: results });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "server error" });
  }
};

module.exports.deleteImage = async (req, res) => {
  const { image, id } = req.params;
  const document = await Products.findOne({ _id: id });
  document.images.splice(image, 1);
  await Products.updateOne(
    { _id: document._id },
    { $set: { images: document.images } }
  );
  return res.send("Done");
};

// module.exports.deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     await Products.deleteOne({ _id: id });
//     res.send({ message: "deleted success." });

//     console.log(res);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "server error" });
//   }
// };

module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findByIdAndDelete({ _id: id });
    return res.send({ message: "deleted success.", product: product });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

module.exports.getItem = async (req, res) => {
  try {
    const { catogary } = req.params;
    // console.log(catogary);
    const data = await Products.find({ category: catogary });

    return res.send(data);
  } catch (err) {
    res.send(err);
  }
};
