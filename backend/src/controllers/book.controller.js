const Book = require("../models/Book");

const getBooks = (req, res) => {
  const books = Book.find();

  res.status(200).json({
    status: "success",
    data: {
      book: books,
    },
  });
};

exports.getBooks = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const search = req.query.search || "";
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;

  const filter = {
    title: { $regex: search, $options: "i" },
  };

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const books = await Book.find(filter)
    .skip(skip)
    .limit(limit)
    .sort("-createdAt");

  const total = await Book.countDocuments(filter);

  res.json({
    total,
    page,
    pages: Math.ceil(total / limit),
    data: books,
  });
};

exports.createBook = (req, res) => {
  const { title, author, price, description } = req.body;

  const newBook = Book.create(req.body);

  newBook.save();
  res.status(201).json({
    status: "success",
    data: {
      book: newBook,
    },
  });
};

const updateBook = (req, res) => {
  const updatedBook = Book.updateOne(req.body);

  updatedBook.save();

  res.status(201).json({
    success: "success",
    data: {
      book: updatedBook,
    },
  });
};

const deleteBook = (req, res) => {
  const { title } = req.body;
  Book.deleteOne(title);

  res.status(200).json({
    status: "success",
  });
};
