const express = require("express");
const placeController = require("../controller/place_ontroller");
const { check } = require("express-validator");
const FileMiddlWware = require("../middleware/file-uplode.js");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/:pid", placeController.getbyplaceid);
router.get("/user/:uid", placeController.getbyuserid);
router.use(checkAuth);
router.post(
  "/",
  FileMiddlWware.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placeController.creatplace
);
router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placeController.updateplace
);
router.delete("/:pid", placeController.deleteplace);

module.exports = router;
