const { v4: UUID } = require("uuid");
const multer = require("multer");
const Mime_type_map = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};
const FileMiddlWware = multer({
  limits: 59999999,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "upload/image");
    },
    filename: (req, file, cb) => {
      const ext = Mime_type_map[file.mimetype];
      cb(null, UUID() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!Mime_type_map[file.mimetype];
    let error = isValid ? null : new Error("only jpg,png,jpeg");

    cb(error, isValid);
  },
});

module.exports = FileMiddlWware;
