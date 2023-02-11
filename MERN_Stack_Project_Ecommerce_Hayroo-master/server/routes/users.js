const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");

router.get("/all-user", usersController.getAllUser);
router.get("/get-all-user", usersController.getAllUserByAdmin);
router.post("/signle-user", usersController.getSingleUser);
router.post("/delete", usersController.deleteUser);

router.post("/add-user", usersController.postAddUser);
router.post("/edit-user", usersController.postEditUser);
router.post("/delete-user", usersController.getDeleteUser);

router.post("/change-password", usersController.changePassword);
router.post("/forget-password", usersController.forgetPassword);
router.patch("/reset-password/:token", usersController.resetPassword);

module.exports = router;
