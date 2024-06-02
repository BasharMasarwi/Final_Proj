import slugify from "slugify";
import categoryModel from "../../../DB/model/category.model.js";
import subcategoryModel from "../../../DB/model/subcategory.model .js";
import cloudinary from "../../utls/cloudinary.js";
import productModel from "../../../DB/model/product.model.js";
import { pagination } from "../../utls/pagination.js";
export const create = async (req, res) => {
  const { name, price, discount, categoryId, subcategoryId } = req.body;
  const checkCategory = await categoryModel.findById(categoryId);
  if (!checkCategory) {
    return res.status(404).json({ message: "category not found" });
  }
  const checkSubCategory = await subcategoryModel.findById(subcategoryId);
  if (!checkSubCategory) {
    return res.status(404).json({ message: "subcategory not found" });
  }
  req.body.slug = slugify(name);
  req.body.finalePrice = price - (price * (discount || 0)) / 100;

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.files.mainImage[0].path,
    {
      folder: `${process.env.APPNAME}/product/${name}`,
    }
  );
  req.body.mainImage = { secure_url, public_id };
  req.body.subImages = [];

  for (const file of req.files.subImages) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      {
        folder: `${process.env.APPNAME}/product/${name}/subImages`,
      }
    );
    req.body.subImages.push({ secure_url, public_id });
  }
  const product = await productModel.create(req.body);
  return res.status(201).json({ message: product });
};
export const search = async (req, res) => {
  const { query, minPrice } = req.query;
  const filters = {};
  if (query) {
    filters.name = { $regex: query, $options: "i" };
  }
  if (minPrice) {
    filters.price = { $gte: Number(minPrice) };
  }

  const products = await productModel.find(filters).select("name price");

  return res.status(200).json({ products });
};
export const getAll = async (req, res) => {
  const { skip, limit } = pagination(req.query.page, req.query.limit);
  let queryObj = { ...req.query };
  const execQuery = ["page", "limit", "sort", "search", "fields"];
  execQuery.map((ele) => {
    delete queryObj[ele];
  });
  queryObj = JSON.stringify(queryObj);
  queryObj = queryObj.replace(
    /gt|gte|lt|lte|in|nin|eq/g,
    (match) => `$${match}`
  );
  queryObj = JSON.parse(queryObj);
  const mongoseQuery = productModel
    .find(queryObj)
    .skip(skip)
    .limit(limit)
    .populate({
      path: "reviews",
      populate: {
        path: "userId",
        select: "userName -_id",
      },
      //
    });
  if (req.query.search) {
    mongoseQuery.find({
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ],
    });
  }

  const count = await productModel.estimatedDocumentCount();
  mongoseQuery.select(req.query.fields);
  const products = await mongoseQuery.sort(req.query.sort); // - for descending && sort({createdAt:-1}).exec()    بظهر حسب الاحدث
  return res.json({ message: "success", count, products });
};
