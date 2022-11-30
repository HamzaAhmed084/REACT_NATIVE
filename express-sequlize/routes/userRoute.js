const router = require("express").Router();
const User = require("../controller/userController");


router.route("/new").post(User.registerUser);
router.route("/all").get( User.getAllUsers);
router.route("/:email").get(User.getSingleUsers);
router.route("/update/:email").put(User.updateUser);
router.route("/delete/:email").delete(User.deleteUser);
router.route("/userJob/:id").get(User.getUserjob);
router.route("/login").post(User.loginUser);
router.route('/jobCount/:id').put(User.jobCount);
module.exports = router; 