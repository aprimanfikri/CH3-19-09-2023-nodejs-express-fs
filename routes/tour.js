const express = require("express");
const tour = require("../controllers/tour");

const router = express.Router();

router.route("/").get(tour.getAllData).post(tour.createData);
router
  .route("/:id")
  .get(tour.getDataById)
  .patch(tour.updateDataById)
  .delete(tour.deleteDataById);

module.exports = router;
