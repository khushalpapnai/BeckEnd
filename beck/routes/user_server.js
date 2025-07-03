const express = require("express");
const user_controler = require("../controller/user_ontroller");
const { check } = require("express-validator");
const FileMiddlWware = require("../middleware/file-uplode");
const router = express.Router();

router.get("/", user_controler.getusers);
router.post(
  "/singup",
  FileMiddlWware.single("image"),
  [
    check("name").not().isEmpty(),
    check("email")
      .normalizeEmail() 
      .isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  user_controler.singup
);
router.post("/login", user_controler.login);

module.exports = router;
