const express = require("express");
const {createToDo,getAllJobs, completeJob} = require("../controller/toDoController");

const router = express.Router();
router.route("/new").post(createToDo);
router.route("/all").get( getAllJobs);
router.route("/jobCompleted/:id").delete(completeJob);

module.exports = router; 