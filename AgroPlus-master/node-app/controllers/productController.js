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

    console.log(search);
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
    
    req.body.pimage.forEach((image) => {
      if (image) {
        images.push(image);
      }
    });
    
    console.log(images); 
    

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
    const images1 = [];
    const { id } = req.params;
    const { pname, plat, plong, pdesc, price, category, userId, pimage } = req.body;
    
        pimage.forEach((image) => {
            images1.push(image);
        });
    

    const data = await Products.findOneAndUpdate(
        { _id: id },
        { pname, plat, plong, pdesc, price, category, userId },
        { new: true }  
        
      );
      if (data) {
        images1.forEach((image) => {
          data.images.push(image);
        });
        
        await data.save();
        res.send({ message: "Product updated successfully." });
    } else {
        res.status(404).send({ message: "Product not found." });
    }
} catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
}

};

module.exports.getProducts = async (req, res) => {
  try {
    const catName = req.query.category;
if(catName){

  let filter = {};
  
    filter = { category: catName };
    const results = await Products.find(filter);
  res.send({ message: "success", products: results });

}
else{
  const results = await Products.find();
  res.send({ message: "success", products: results });

}
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
  try {
    const { image, id } = req.params;
    const document = await Products.findById(id);

    if (!document) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (image < 0 || image >= document.images.length) {
      return res.status(400).json({ message: "Invalid image index" });
    }

    document.images.splice(image, 1);

    await document.save();

    return res.status(200).json({ message: "Image deleted successfully", images: document.images });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
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
