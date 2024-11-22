import animeModel from "../../../DB/model/anime.model.js";
import categoryModel from "../../../DB/model/category.model.js";
import cloudinary from "../../utls/cloudinary.js";
import slugify from "slugify";
import { pagination } from "../../utls/pagination.js";
import { AppError } from "../../utls/AppError.js";

export const createAnime = async (req, res) => {
  req.body.name = req.body.name.toLowerCase();
  if (!(await categoryModel.findOne({ _id: req.body.categoryId }))) {
    return res.status(404).json({ message: "category not found" });
  }
  if (await animeModel.findOne({ name: req.body.name })) {
    return res.status(409).json({ message: "anime already exist" });
  }
  req.body.slug = slugify(req.body.name);

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: "BasharShop/anime",
    }
  );
  req.body.image = { secure_url, public_id };
  req.body.createdBy = req.user._id;
  req.body.updatedBy = req.user._id;
  const anime = await animeModel.create(req.body);
  return res.json({ message: "success", Anime: anime });
};
export const getAll = async (req, res, next) => {
  const { skip, limit } = pagination(req.query.page, req.query.limit);
  let queryObj = { ...req.query };
  const execQuery = ["page", "limit", "sort", "search", "fields"];
  execQuery.map((ele) => {
    delete queryObj[ele];
  });
  queryObj = JSON.stringify(queryObj);
  queryObj = queryObj.replace(/gt|gte|lt|lte|nin|eq/g, (match) => `$${match}`);
  queryObj = JSON.parse(queryObj);

  const mongooseQuery = animeModel.find(queryObj).skip(skip).limit(limit);
  if (req.query.search) {
    mongooseQuery.find({
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ],
    });
  }
  mongooseQuery.select(req.query.fields);
  let animes = await mongooseQuery.sort(req.query.sort).lean(); // إضافة .lean()

  const countAllAnimes = await animeModel.estimatedDocumentCount();

  return res.status(200).json({
    message: "success",
    countAllAnimes,
    count: animes.length,
    Animes: animes,
  });
};
export const getOngoing = async (req, res, next) => {
  const { skip, limit } = pagination(req.query.page, req.query.limit);
  let queryObj = { ...req.query };
  const execQuery = ["page", "limit", "sort", "search", "fields"];
  execQuery.map((ele) => {
    delete queryObj[ele];
  });
  queryObj = JSON.stringify(queryObj);
  queryObj = queryObj.replace(/gt|gte|lt|lte|nin|eq/g, (match) => `$${match}`);
  queryObj = JSON.parse(queryObj);
  queryObj.status = "ongoing";
  const mongooseQuery = animeModel.find(queryObj).skip(skip).limit(limit);
  if (req.query.search) {
    mongooseQuery.find({
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ],
    });
  }
  mongooseQuery.select(req.query.fields);
  let animes = await mongooseQuery.sort(req.query.sort).lean(); // إضافة .lean()

  const countAllAnimes = await animeModel.estimatedDocumentCount();

  return res.status(200).json({
    message: "success",
    countAllAnimes,
    count: animes.length,
    Animes: animes,
  });
};
export const getCompleted = async (req, res, next) => {
  const { skip, limit } = pagination(req.query.page, req.query.limit);
  let queryObj = { ...req.query };
  const execQuery = ["page", "limit", "sort", "search", "fields"];
  execQuery.map((ele) => {
    delete queryObj[ele];
  });
  queryObj = JSON.stringify(queryObj);
  queryObj = queryObj.replace(/gt|gte|lt|lte|nin|eq/g, (match) => `$${match}`);
  queryObj = JSON.parse(queryObj);
  queryObj.status = "completed";
  const mongooseQuery = animeModel.find(queryObj).skip(skip).limit(limit);
  if (req.query.search) {
    mongooseQuery.find({
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ],
    });
  }
  mongooseQuery.select(req.query.fields);
  let animes = await mongooseQuery.sort(req.query.sort).lean(); // إضافة .lean()

  const countAllAnimes = await animeModel.estimatedDocumentCount();

  return res.status(200).json({
    message: "success",
    countAllAnimes,
    count: animes.length,
    Animes: animes,
  });
};
export const getAnime = async (req, res, next) => {
  const anime = await animeModel.findOne({ _id: req.params.id }).populate(
    {
      path: "category",
      select: "name",
    }
  ).populate({
    path: "reviews",
    populate: {
      path: "userId",
      select: "userName -_id",
    },
  })
  .lean();
  if (!anime) {
    return next(new AppError(`Anime not found`, 404));
  }

  return res.json({ message: "success", Anime: anime });
};
// export const getAnimesByCategory = async (req, res, next) => {
//   const {id } = req.params
//  const category = await categoryModel.findById(id);
//   if (!category) {
//     return next(new AppError(`Category not found`, 404));
//   }

//   const animes = await animeModel.find({ categoryId: id }).populate(
//     {
//       path: "category",
//       select: "name",
//     }.
//   ).populate({
//     path: "reviews",
//     populate: {
//       path: "userId",
//       select: "userName -_id",
//     },
//   })
//   .lean();

//   return res.json({ message: "success", Animes: animes });
// };
export const updateAnime = async (req, res, next) => {
  const anime = await animeModel.findById(req.params.id);
  if (!anime) {
    return next(new AppError(`Anime not found`, 404));
  }

  cloudinary.uploader.destroy(anime.image.public_id);
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: "BasharShop/anime",
    }
  );

  req.body.image = { secure_url, public_id };
  const newAnime = await animeModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.json({ message: "success", Anime: newAnime });
}
export const deleteAnime = async (req, res, next) => {
  const anime = await animeModel.findById(req.params.id);
  if (!anime) {
    return next(new AppError(`Anime not found`, 404));
  }
  cloudinary.uploader.destroy(anime.image.public_id);
  await animeModel.findByIdAndDelete(req.params.id);
  return res.json({ message: "success" });
};
  