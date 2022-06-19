import mongoose from "mongoose";
import randomstring from "randomstring";
const productSchema = new mongoose.Schema(
  {
    //_id: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    mark: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    reviews: { type: Number, required: false },
    reference: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// productSchema.pre("save", async function (next) {
//   this.reference = randomstring.generate({
//     length: 12,
//     charset: "alphabetic",
//   });
//   next();
// });

const Product = mongoose.model("Product", productSchema);

export default Product;
