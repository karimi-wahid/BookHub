import mongoose from "mongoose";
import Book from "../models/Book";

const getBooks = (req, res) => {
  const books = Book.find();

  res.status(200).json({
    status: "success",
    data: {
      book: books,
    },
  });
};

const getBook = (req, res) => {
  const { id } = req.param;

  const book = Book.find(id);

  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
};

const createBook = (req, res) => {
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
