const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const bookController = require("../controllers/book.controller");

// CREATE BOOK (Admin only)
router.post(
  "/",
  auth,
  role("admin"),
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  bookController.createBook,
);

module.exports = router;
